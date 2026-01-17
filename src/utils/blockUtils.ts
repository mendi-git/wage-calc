import { TimeBlock, OBType, OVType, ClassifiedBlock, SickEntry, WeeklyNorm } from '../types';
import { isWeekend, getDailyNorm, toLocalDateKey } from './timeUtils';
import { BLOCK_MIN, BLOCK_HOURS } from './constants';

export function obType(b: TimeBlock): OBType | null {
  const h = b.start.getHours();
  
  if (isWeekend(b.start) || h >= 22 || h < 5) return 'OB3';
  if (h >= 18 && h < 22) return 'OB2';
  if (h >= 5 && h < 6) return 'OB1';
  
  return null;
}

export function ovType(b: TimeBlock): OVType {
  const h = b.start.getHours();
  
  if (isWeekend(b.start) || h >= 22 || h < 5) return 'OVD';
  if (h === 5 || (h >= 17 && h < 19)) return 'OVB';
  if (h >= 19 && h < 22) return 'OVC';
  if (h >= 6 && h < 17) return 'OVA';
  
  return 'OVA';
}

export function classifyBlocks(
  normalBlocks: TimeBlock[],
  sickEntries: SickEntry[],
  weekNorm: WeeklyNorm
): ClassifiedBlock[] {
  normalBlocks.sort((a, b) => a.start.getTime() - b.start.getTime());
  
  // Calculate how many OT blocks needed
  const totalNormalBlocks = normalBlocks.length;
  const sickNormBlocks = sickEntries.reduce(
    (acc, e) => acc + Math.round(e.hours / BLOCK_HOURS),
    0
  );
  const weekNormBlocks = Math.round(weekNorm / BLOCK_HOURS);
  let ovBlocksNeeded = Math.max(0, totalNormalBlocks + sickNormBlocks - weekNormBlocks);
  
  // Build boundary events for weekly overtime calculation
  const boundaryEvents: Array<{
    time: Date;
    kind: 'sick' | 'block';
    minutes?: number;
    block?: TimeBlock;
  }> = [];
  
  for (const e of sickEntries) {
    if (e.hours > 0) {
      const t = new Date(e.dateStr + 'T00:00:00');
      boundaryEvents.push({ time: t, kind: 'sick', minutes: e.hours * 60 });
    }
  }
  
  for (const b of normalBlocks) {
    boundaryEvents.push({ time: b.start, kind: 'block', block: b });
  }
  
  boundaryEvents.sort((x, y) => {
    const timeDiff = x.time.getTime() - y.time.getTime();
    if (timeDiff !== 0) return timeDiff;
    return x.kind === 'sick' ? -1 : 1;
  });
  
  // Mark blocks that occur after weekly norm boundary
  let weekAccumMin = 0;
  const afterBoundary = new Map<TimeBlock, boolean>();
  const weekNormMin = weekNorm * 60;
  
  for (const ev of boundaryEvents) {
    if (ev.kind === 'sick') {
      weekAccumMin += ev.minutes!;
    } else {
      afterBoundary.set(ev.block!, weekAccumMin >= weekNormMin);
      weekAccumMin += BLOCK_MIN;
    }
  }
  
  // Track daily minutes for daily excess calculation
  const dayMins: Record<string, number> = {};
  const dailyNormMinCache: Record<string, number> = {};
  
  const classified: ClassifiedBlock[] = [];
  
  for (const b of normalBlocks) {
    const dK = toLocalDateKey(b.start);
    if (!(dK in dayMins)) dayMins[dK] = 0;
    
    if (!(dK in dailyNormMinCache)) {
      const dn = getDailyNorm(weekNorm, b.start);
      dailyNormMinCache[dK] = dn * 60;
    }
    const dayNormMin = dailyNormMinCache[dK];
    
    const isDailyExcess = dayNormMin > 0 && dayMins[dK] >= dayNormMin;
    const isAfterBoundary = !!afterBoundary.get(b);
    
    const eligibleForOV = isDailyExcess || isAfterBoundary;
    let isOV = false;
    let bonus: OBType | OVType | null = null;
    
    if (eligibleForOV && ovBlocksNeeded > 0) {
      isOV = true;
      bonus = ovType(b);
      ovBlocksNeeded--;
    } else {
      bonus = obType(b);
    }
    
    classified.push({ block: b, isOV, bonus });
    dayMins[dK] += BLOCK_MIN;
  }
  
  return classified;
}
