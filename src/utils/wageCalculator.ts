import {
  Week,
  CalculationResult,
  WeekBreakdown,
  DayBreakdown,
  SickEntry,
  ClassifiedBlock,
} from '../types';
import { buildBlocks, applyUnpaidBreak, toLocalDateKey, formatTime, getDayOfWeek } from './timeUtils';
import { classifyBlocks } from './blockUtils';
import { BLOCK_HOURS, OB_RATE, OV_RATE } from './constants';

function buildSickIndexMap(weeks: Week[]): Record<string, number> {
  const allSickDays = weeks
    .flatMap(w => w.days.filter(d => d.isSick))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const map: Record<string, number> = {};
  let counter = 0;
  let prev: string | null = null;
  
  for (const d of allSickDays) {
    if (prev) {
      const pd = new Date(prev);
      pd.setDate(pd.getDate() + 1);
      const isConsecutive = toLocalDateKey(pd) === d.date;
      counter = isConsecutive ? counter + 1 : 1;
    } else {
      counter = 1;
    }
    map[d.date] = counter;
    prev = d.date;
  }
  
  return map;
}

export function calculateWages(weeks: Week[], hourlyWage: number): CalculationResult {
  const sickIndexByDate = buildSickIndexMap(weeks);
  const weekBreakdowns: WeekBreakdown[] = [];
  
  const grandTotal = {
    totalHours: 0,
    totalPay: 0,
    baseHours: 0,
    basePay: 0,
    OB1Hours: 0,
    OB1Pay: 0,
    OB2Hours: 0,
    OB2Pay: 0,
    OB3Hours: 0,
    OB3Pay: 0,
    OVAHours: 0,
    OVAPay: 0,
    OVBHours: 0,
    OVBPay: 0,
    OVCHours: 0,
    OVCPay: 0,
    OVDHours: 0,
    OVDPay: 0,
  };
  
  for (const week of weeks) {
    const weekBreakdown = calculateWeek(week, hourlyWage, sickIndexByDate);
    weekBreakdowns.push(weekBreakdown);
    
    // Add to grand total
    grandTotal.totalHours += weekBreakdown.totalHours;
    grandTotal.totalPay += weekBreakdown.totalPay;
    grandTotal.baseHours += weekBreakdown.baseHours;
    grandTotal.basePay += weekBreakdown.basePay;
    grandTotal.OB1Hours += weekBreakdown.OB1Hours;
    grandTotal.OB1Pay += weekBreakdown.OB1Pay;
    grandTotal.OB2Hours += weekBreakdown.OB2Hours;
    grandTotal.OB2Pay += weekBreakdown.OB2Pay;
    grandTotal.OB3Hours += weekBreakdown.OB3Hours;
    grandTotal.OB3Pay += weekBreakdown.OB3Pay;
    grandTotal.OVAHours += weekBreakdown.OVAHours;
    grandTotal.OVAPay += weekBreakdown.OVAPay;
    grandTotal.OVBHours += weekBreakdown.OVBHours;
    grandTotal.OVBPay += weekBreakdown.OVBPay;
    grandTotal.OVCHours += weekBreakdown.OVCHours;
    grandTotal.OVCPay += weekBreakdown.OVCPay;
    grandTotal.OVDHours += weekBreakdown.OVDHours;
    grandTotal.OVDPay += weekBreakdown.OVDPay;
  }
  
  return { weeks: weekBreakdowns, grandTotal };
}

function calculateWeek(
  week: Week,
  hourlyWage: number,
  sickIndexByDate: Record<string, number>
): WeekBreakdown {
  // Separate normal work days and sick days
  const normalDays = week.days.filter(d => !d.isSick && d.startTime && d.endTime);
  const sickDays = week.days.filter(d => d.isSick);
  
  // Build blocks for normal days
  const normalBlocks = normalDays.flatMap(d => {
    let blocks = buildBlocks(d.date, d.startTime!, d.endTime!);
    blocks = applyUnpaidBreak(blocks);
    return blocks;
  });
  
  // Build sick entries
  const sickEntries: SickEntry[] = sickDays.map(d => {
    const idx = sickIndexByDate[d.date] || 1;
    const hours = idx === 1 ? 8 : idx >= 2 && idx <= 14 ? 8 : 0;
    const pay = idx === 1 ? 0 : idx >= 2 && idx <= 14 ? 8 * hourlyWage * 0.8 : 0;
    return { dateStr: d.date, hours, pay, sickIndex: idx };
  });
  
  // Classify blocks
  const classified = classifyBlocks(normalBlocks, sickEntries, week.weeklyNorm);
  
  // Build daily aggregation
  const dailyMap: Record<string, {
    blocks: ClassifiedBlock[];
    startTime?: Date;
    endTime?: Date;
    sickHours: number;
    sickPay: number;
    sickIndex?: number;
  }> = {};
  
  // Add normal blocks
  for (const c of classified) {
    const k = toLocalDateKey(c.block.start);
    if (!dailyMap[k]) {
      dailyMap[k] = { blocks: [], sickHours: 0, sickPay: 0 };
    }
    dailyMap[k].blocks.push(c);
    
    const s = c.block.start;
    const e = c.block.end;
    if (!dailyMap[k].startTime || s < dailyMap[k].startTime!) {
      dailyMap[k].startTime = s;
    }
    if (!dailyMap[k].endTime || e > dailyMap[k].endTime!) {
      dailyMap[k].endTime = e;
    }
  }
  
  // Add sick days
  for (const e of sickEntries) {
    if (!dailyMap[e.dateStr]) {
      dailyMap[e.dateStr] = { blocks: [], sickHours: 0, sickPay: 0 };
    }
    dailyMap[e.dateStr].sickHours += e.hours;
    dailyMap[e.dateStr].sickPay += e.pay;
    dailyMap[e.dateStr].sickIndex = e.sickIndex;
  }
  
  // Calculate daily breakdowns
  const dayBreakdowns: DayBreakdown[] = [];
  const weekTotals = {
    totalHours: 0,
    totalPay: 0,
    baseHours: 0,
    basePay: 0,
    OB1Hours: 0,
    OB1Pay: 0,
    OB2Hours: 0,
    OB2Pay: 0,
    OB3Hours: 0,
    OB3Pay: 0,
    OVAHours: 0,
    OVAPay: 0,
    OVBHours: 0,
    OVBPay: 0,
    OVCHours: 0,
    OVCPay: 0,
    OVDHours: 0,
    OVDPay: 0,
  };
  
  for (const dateKey of Object.keys(dailyMap).sort()) {
    const data = dailyMap[dateKey];
    const date = new Date(dateKey);
    
    let baseHours = data.sickHours;
    let basePay = data.sickPay;
    let OB1Hours = 0, OB1Pay = 0, OB2Hours = 0, OB2Pay = 0, OB3Hours = 0, OB3Pay = 0;
    let OVAHours = 0, OVAPay = 0, OVBHours = 0, OVBPay = 0, OVCHours = 0, OVCPay = 0, OVDHours = 0, OVDPay = 0;
    
    for (const c of data.blocks) {
      baseHours += BLOCK_HOURS;
      basePay += hourlyWage * BLOCK_HOURS;
      
      if (c.isOV) {
        const t = c.bonus;
        const r = OV_RATE[t as keyof typeof OV_RATE] || 0;
        
        if (t === 'OVA') { OVAHours += BLOCK_HOURS; OVAPay += hourlyWage * r * BLOCK_HOURS; }
        if (t === 'OVB') { OVBHours += BLOCK_HOURS; OVBPay += hourlyWage * r * BLOCK_HOURS; }
        if (t === 'OVC') { OVCHours += BLOCK_HOURS; OVCPay += hourlyWage * r * BLOCK_HOURS; }
        if (t === 'OVD') { OVDHours += BLOCK_HOURS; OVDPay += hourlyWage * r * BLOCK_HOURS; }
      } else if (c.bonus) {
        const t = c.bonus;
        const r = OB_RATE[t as keyof typeof OB_RATE] || 0;
        
        if (t === 'OB1') { OB1Hours += BLOCK_HOURS; OB1Pay += hourlyWage * r * BLOCK_HOURS; }
        if (t === 'OB2') { OB2Hours += BLOCK_HOURS; OB2Pay += hourlyWage * r * BLOCK_HOURS; }
        if (t === 'OB3') { OB3Hours += BLOCK_HOURS; OB3Pay += hourlyWage * r * BLOCK_HOURS; }
      }
    }
    
    const totalPay = basePay + OB1Pay + OB2Pay + OB3Pay + OVAPay + OVBPay + OVCPay + OVDPay;
    
    dayBreakdowns.push({
      date: dateKey,
      dayOfWeek: getDayOfWeek(date),
      startTime: data.startTime ? formatTime(data.startTime) : undefined,
      endTime: data.endTime ? formatTime(data.endTime) : undefined,
      baseHours,
      basePay,
      OB1Hours,
      OB1Pay,
      OB2Hours,
      OB2Pay,
      OB3Hours,
      OB3Pay,
      OVAHours,
      OVAPay,
      OVBHours,
      OVBPay,
      OVCHours,
      OVCPay,
      OVDHours,
      OVDPay,
      totalPay,
      isSick: data.sickIndex !== undefined,
      sickDay: data.sickIndex,
    });
    
    // Add to week totals
    weekTotals.totalHours += baseHours;
    weekTotals.totalPay += totalPay;
    weekTotals.baseHours += baseHours;
    weekTotals.basePay += basePay;
    weekTotals.OB1Hours += OB1Hours;
    weekTotals.OB1Pay += OB1Pay;
    weekTotals.OB2Hours += OB2Hours;
    weekTotals.OB2Pay += OB2Pay;
    weekTotals.OB3Hours += OB3Hours;
    weekTotals.OB3Pay += OB3Pay;
    weekTotals.OVAHours += OVAHours;
    weekTotals.OVAPay += OVAPay;
    weekTotals.OVBHours += OVBHours;
    weekTotals.OVBPay += OVBPay;
    weekTotals.OVCHours += OVCHours;
    weekTotals.OVCPay += OVCPay;
    weekTotals.OVDHours += OVDHours;
    weekTotals.OVDPay += OVDPay;
  }
  
  return {
    weekNumber: week.weekNumber,
    year: week.year,
    days: dayBreakdowns,
    ...weekTotals,
  };
}
