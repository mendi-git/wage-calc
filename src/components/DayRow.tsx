import React from 'react';
import { WorkDay } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getDayName } from '../i18n/translations';

interface DayRowProps {
  day: WorkDay;
  onChange: (day: WorkDay) => void;
}

export const DayRow: React.FC<DayRowProps> = ({ day, onChange }) => {
  const { t, language } = useLanguage();
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
    <div className={`py-3 border-b border-byggnads-gray-200 last:border-b-0 ${isWeekend ? 'bg-byggnads-gray-50' : ''}`}>
      {/* Mobile Layout */}
      <div className="block sm:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-byggnads-dark">
            {getDayName(language, day.dayOfWeek)}
            {isWeekend && <span className="ml-2 text-xs text-byggnads-gray-500">({t.weekend})</span>}
          </div>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 bg-byggnads-gray-200 text-byggnads-gray-700 text-xs font-medium rounded-lg hover:bg-byggnads-gray-300 transition"
            title={t.clear}
          >
            {t.clear}
          </button>
        </div>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={day.isSick || false}
            onChange={(e) => onChange({ ...day, isSick: e.target.checked })}
            className="w-4 h-4 text-byggnads-orange-500 rounded focus:ring-2 focus:ring-byggnads-orange-300 cursor-pointer"
          />
          <span className="text-sm text-byggnads-gray-600 font-medium">{t.sick}</span>
        </label>
        
        {!day.isSick && (
          <div className="flex gap-3">
            <label className="flex-1 flex flex-col gap-1">
              <span className="text-xs text-byggnads-gray-600 font-medium">{t.start}</span>
              <input
                type="time"
                value={day.startTime || ''}
                onChange={(e) => onChange({ ...day, startTime: e.target.value })}
                className="input-field py-2 text-sm"
              />
            </label>
            
            <label className="flex-1 flex flex-col gap-1">
              <span className="text-xs text-byggnads-gray-600 font-medium">{t.end}</span>
              <input
                type="time"
                value={day.endTime || ''}
                onChange={(e) => onChange({ ...day, endTime: e.target.value })}
                className="input-field py-2 text-sm"
              />
            </label>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="w-28 font-semibold text-byggnads-dark">
          {getDayName(language, day.dayOfWeek)}
          {isWeekend && <span className="ml-2 text-xs text-byggnads-gray-500">({t.weekend})</span>}
        </div>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={day.isSick || false}
            onChange={(e) => onChange({ ...day, isSick: e.target.checked })}
            className="w-4 h-4 text-byggnads-orange-500 rounded focus:ring-2 focus:ring-byggnads-orange-300 cursor-pointer"
          />
          <span className="text-sm text-byggnads-gray-600 font-medium">{t.sick}</span>
        </label>
        
        {!day.isSick && (
          <>
            <label className="flex items-center gap-2">
              <span className="text-sm text-byggnads-gray-600 font-medium">{t.start}:</span>
              <input
                type="time"
                value={day.startTime || ''}
                onChange={(e) => onChange({ ...day, startTime: e.target.value })}
                className="input-field py-1.5"
              />
            </label>
            
            <label className="flex items-center gap-2">
              <span className="text-sm text-byggnads-gray-600 font-medium">{t.end}:</span>
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
          title={t.clear}
        >
          {t.clear}
        </button>
      </div>
    </div>
  );
};
