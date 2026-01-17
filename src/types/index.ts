export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type DayOfWeekNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7; // Monday=1, Sunday=7

export type WeeklyNorm = number;

export interface WorkDay {
  date: string; // ISO date string (YYYY-MM-DD)
  dayOfWeek: DayOfWeek;
  startTime?: string; // HH:MM format
  endTime?: string; // HH:MM format
  isSick?: boolean;
}

export interface Week {
  id: string;
  weekNumber: number; // ISO week number
  year: number;
  weeklyNorm: WeeklyNorm;
  days: WorkDay[];
}

export interface TimeBlock {
  start: Date;
  end: Date;
}

export type OBType = 'OB1' | 'OB2' | 'OB3';
export type OVType = 'OVA' | 'OVB' | 'OVC' | 'OVD';
export type BonusType = OBType | OVType | null;

export interface ClassifiedBlock {
  block: TimeBlock;
  isOV: boolean;
  bonus: BonusType;
}

export interface DayBreakdown {
  date: string;
  dayOfWeek: DayOfWeek;
  startTime?: string;
  endTime?: string;
  baseHours: number;
  basePay: number;
  OB1Hours: number;
  OB1Pay: number;
  OB2Hours: number;
  OB2Pay: number;
  OB3Hours: number;
  OB3Pay: number;
  OVAHours: number;
  OVAPay: number;
  OVBHours: number;
  OVBPay: number;
  OVCHours: number;
  OVCPay: number;
  OVDHours: number;
  OVDPay: number;
  totalPay: number;
  isSick?: boolean;
  sickDay?: number;
}

export interface WeekBreakdown {
  weekNumber: number;
  year: number;
  days: DayBreakdown[];
  totalHours: number;
  totalPay: number;
  baseHours: number;
  basePay: number;
  OB1Hours: number;
  OB1Pay: number;
  OB2Hours: number;
  OB2Pay: number;
  OB3Hours: number;
  OB3Pay: number;
  OVAHours: number;
  OVAPay: number;
  OVBHours: number;
  OVBPay: number;
  OVCHours: number;
  OVCPay: number;
  OVDHours: number;
  OVDPay: number;
}

export interface CalculationResult {
  weeks: WeekBreakdown[];
  grandTotal: {
    totalHours: number;
    totalPay: number;
    baseHours: number;
    basePay: number;
    OB1Hours: number;
    OB1Pay: number;
    OB2Hours: number;
    OB2Pay: number;
    OB3Hours: number;
    OB3Pay: number;
    OVAHours: number;
    OVAPay: number;
    OVBHours: number;
    OVBPay: number;
    OVCHours: number;
    OVCPay: number;
    OVDHours: number;
    OVDPay: number;
  };
}

export interface SickEntry {
  dateStr: string;
  hours: number;
  pay: number;
  sickIndex: number;
}
