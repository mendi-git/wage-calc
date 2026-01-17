import React from 'react';
import { WorkDay } from '../types';

interface DayRowProps {
  day: WorkDay;
  onChange: (day: WorkDay) => void;
}

const DAY_NAMES_SV: Record<string, string> = {
  'Monday': 'Måndag',
  'Tuesday': 'Tisdag',
  'Wednesday': 'Onsdag',
  'Thursday': 'Torsdag',
  'Friday': 'Fredag',
  'Saturday': 'Lördag',
  'Sunday': 'Söndag',
};

export const DayRow: React.FC<DayRowProps> = ({ day, onChange }) => {
  const isWeekend = day.dayOfWeek === 'Saturday' || day.dayOfWeek === 'Sunday';
  
  const handleClear = () => {
    onChange({
      ...day,
      startTime: undefined,
      endTime: undefined,
      isSick: false,
    });
  };
  
  return (
    <div className={`flex items-center gap-3 py-3 border-b border-byggnads-gray-200 last:border-b-0 ${isWeekend ? 'bg-byggnads-gray-50' : ''}`}>
      <div className="w-28 font-semibold text-byggnads-dark">
        {DAY_NAMES_SV[day.dayOfWeek] || day.dayOfWeek}
        {isWeekend && <span className="ml-2 text-xs text-byggnads-gray-500">(helg)</span>}
      </div>
      
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={day.isSick || false}
          onChange={(e) => onChange({ ...day, isSick: e.target.checked })}
          className="w-4 h-4 text-byggnads-orange-500 rounded focus:ring-2 focus:ring-byggnads-orange-300 cursor-pointer"
        />
        <span className="text-sm text-byggnads-gray-600 font-medium">Sjuk</span>
      </label>
      
      {!day.isSick && (
        <>
          <label className="flex items-center gap-2">
            <span className="text-sm text-byggnads-gray-600 font-medium">Start:</span>
            <input
              type="time"
              value={day.startTime || ''}
              onChange={(e) => onChange({ ...day, startTime: e.target.value })}
              className="input-field py-1.5"
            />
          </label>
          
          <label className="flex items-center gap-2">
            <span className="text-sm text-byggnads-gray-600 font-medium">Slut:</span>
            <input
              type="time"
              value={day.endTime || ''}
              onChange={(e) => onChange({ ...day, endTime: e.target.value })}
              className="input-field py-1.5"
            />
          </label>
        </>
      )}
      
      <button
        onClick={handleClear}
        className="ml-auto px-3 py-1.5 bg-byggnads-gray-200 text-byggnads-gray-700 text-sm font-medium rounded-lg hover:bg-byggnads-gray-300 transition"
        title="Rensa dag"
      >
        Rensa
      </button>
    </div>
  );
};
