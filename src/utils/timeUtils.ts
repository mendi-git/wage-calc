import { DayOfWeek, TimeBlock, WeeklyNorm } from '../types';
import { BLOCK_MIN, DAY_NAMES } from './constants';

export function toLocalDateKey(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function parseTime(dateStr: string, timeStr: string): Date {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date(dateStr + 'T00:00:00');
  d.setHours(h, m, 0, 0);
  return d;
}

export function buildBlocks(dateStr: string, startStr: string, endStr: string): TimeBlock[] {
  let start = parseTime(dateStr, startStr);
  let end = parseTime(dateStr, endStr);
  
  // If end is before or equal to start, assume next day
  if (end <= start) {
    end = new Date(end.getTime() + 24 * 3600 * 1000);
  }
  
  const blocks: TimeBlock[] = [];
  let t = new Date(start);
  
  while (t < end) {
    const bEnd = new Date(t.getTime() + BLOCK_MIN * 60000);
    blocks.push({ start: new Date(t), end: bEnd });
    t = bEnd;
  }
  
  return blocks;
}

export function applyUnpaidBreak(blocks: TimeBlock[]): TimeBlock[] {
  // Unpaid break always in the 6th hour => remove blocks 10 & 11 (0-indexed)
  if (blocks.length > 10) {
    return blocks.filter((_, i) => !(i === 10 || i === 11));
  }
  return blocks;
}

export function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

export function getDayOfWeek(date: Date): DayOfWeek {
  return DAY_NAMES[date.getDay()];
}

function countWorkDays(workWeekStart: number, workWeekEnd: number): number {
  if (workWeekStart <= workWeekEnd) {
    // Normal week (e.g., Monday=1 to Friday=5)
    return workWeekEnd - workWeekStart + 1;
  } else {
    // Wrap-around week (e.g., Saturday=6 to Tuesday=2)
    return (7 - workWeekStart + 1) + workWeekEnd;
  }
}

function isInWorkWeek(dayOfWeek: number, workWeekStart: number, workWeekEnd: number): boolean {
  if (workWeekStart <= workWeekEnd) {
    // Normal week (e.g., Monday=1 to Friday=5)
    return dayOfWeek >= workWeekStart && dayOfWeek <= workWeekEnd;
  } else {
    // Wrap-around week (e.g., Saturday=6 to Tuesday=2)
    return dayOfWeek >= workWeekStart || dayOfWeek <= workWeekEnd;
  }
}

export function getDailyNorm(
  weekNorm: WeeklyNorm, 
  date: Date, 
  workWeekStart: number = 1, 
  workWeekEnd: number = 5
): number {
  const day = date.getDay() || 7; // Convert Sunday=0 to 7
  
  // Check if this day is within the work week
  if (!isInWorkWeek(day, workWeekStart, workWeekEnd)) {
    return 0;
  }
  
  // Calculate daily norm by dividing weekly norm by number of work days
  const workDays = countWorkDays(workWeekStart, workWeekEnd);
  return weekNorm / workDays;
}

export function getISOWeek(d: Date): { year: number; week: number } {
  const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = dt.getUTCDay() || 7;
  dt.setUTCDate(dt.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((dt.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return { year: dt.getUTCFullYear(), week: weekNo };
}

export function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

export function getDateFromWeekAndDay(year: number, week: number, dayOfWeek: number): string {
  // dayOfWeek: 1=Mon, 7=Sun
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  const weekStart = new Date(jan4.getTime());
  weekStart.setUTCDate(jan4.getUTCDate() - jan4Day + 1 + (week - 1) * 7);
  weekStart.setUTCDate(weekStart.getUTCDate() + dayOfWeek - 1);
  return toLocalDateKey(weekStart);
}

export function getWeekDateRange(year: number, week: number): { start: string; end: string } {
  const startDate = getDateFromWeekAndDay(year, week, 1); // Monday
  const endDate = getDateFromWeekAndDay(year, week, 7); // Sunday
  return { start: startDate, end: endDate };
}

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const startMonth = startDate.toLocaleDateString('en', { month: 'short' });
  const startDay = startDate.getDate();
  const endMonth = endDate.toLocaleDateString('en', { month: 'short' });
  const endDay = endDate.getDate();
  
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}–${endDay}`;
  }
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
}
