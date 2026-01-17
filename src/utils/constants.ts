import { OBType, OVType } from '../types';

export const BLOCK_HOURS = 0.5;
export const BLOCK_MIN = 30;

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export const OB_RATE: Record<OBType, number> = {
  OB1: 0.20, // 20% - 05:00-06:00 weekdays
  OB2: 0.40, // 40% - 18:00-22:00 weekdays
  OB3: 0.70, // 70% - 22:00-05:00 weekdays, all weekend
};

export const OV_RATE: Record<OVType, number> = {
  OVA: 0.30, // 30% - 06:00-17:00 weekdays
  OVB: 0.50, // 50% - 05:00, 17:00-19:00 weekdays
  OVC: 0.70, // 70% - 19:00-22:00 weekdays
  OVD: 1.00, // 100% - 22:00-05:00 weekdays, all weekend
};

export const LABELS: Record<OBType | OVType, string> = {
  OB1: 'OB1 (20%)',
  OB2: 'OB2 (40%)',
  OB3: 'OB3 (70%)',
  OVA: 'OVA (30%)',
  OVB: 'OVB (50%)',
  OVC: 'OVC (70%)',
  OVD: 'OVD (100%)',
};
