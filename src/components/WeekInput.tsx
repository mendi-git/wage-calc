import React, { useState } from 'react';
import { Week, WorkDay, WeeklyNorm, DayOfWeek, DayOfWeekNumber } from '../types';
import { getISOWeek, getDateFromWeekAndDay } from '../utils/timeUtils';
import { DayRow } from './DayRow';

interface WeekInputProps {
  weeks: Week[];
  onAddWeek: (week: Week) => void;
  onUpdateWeek: (week: Week) => void;
  onDeleteWeek: (weekId: string) => void;
  onCopyWeek: (week: Week) => void;
  workWeekStart: DayOfWeekNumber;
  workWeekEnd: DayOfWeekNumber;
}

const DAY_ORDER: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const WeekInput: React.FC<WeekInputProps> = ({
  weeks,
  onAddWeek,
  onUpdateWeek,
  onDeleteWeek,
  onCopyWeek,
  workWeekStart,
  workWeekEnd,
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState(getISOWeek(new Date()).week);
  const [weeklyNorm, setWeeklyNorm] = useState<WeeklyNorm>(40);
  const [defaultStartTime, setDefaultStartTime] = useState('09:00');
  const [defaultEndTime, setDefaultEndTime] = useState('17:00');
  const [editingWeekId, setEditingWeekId] = useState<string | null>(null);
  
  const handleAddWeek = () => {
    // Check if week already exists
    const existingWeek = weeks.find(w => w.year === selectedYear && w.weekNumber === selectedWeek);
    if (existingWeek) {
      alert('Denna vecka finns redan!');
      return;
    }
    
    // Helper function to check if a day is within the work week
    const isInWorkWeek = (dayNum: number): boolean => {
      if (workWeekStart <= workWeekEnd) {
        // Normal week (e.g., Monday=1 to Friday=5)
        return dayNum >= workWeekStart && dayNum <= workWeekEnd;
      } else {
        // Wrap-around week (e.g., Saturday=6 to Tuesday=2)
        return dayNum >= workWeekStart || dayNum <= workWeekEnd;
      }
    };
    
    // Create all 7 days (Mon-Sun), pre-fill days within work week
    const days: WorkDay[] = DAY_ORDER.map((dayOfWeek, index) => {
      const dayNum = index + 1; // Monday = 1, Sunday = 7
      const date = getDateFromWeekAndDay(selectedYear, selectedWeek, dayNum);
      const isWorkDay = isInWorkWeek(dayNum);
      
      return {
        date,
        dayOfWeek,
        startTime: isWorkDay ? defaultStartTime : undefined,
        endTime: isWorkDay ? defaultEndTime : undefined,
        isSick: false,
      };
    });
    
    const newWeek: Week = {
      id: `${selectedYear}-W${selectedWeek}`,
      weekNumber: selectedWeek,
      year: selectedYear,
      weeklyNorm,
      days,
    };
    
    onAddWeek(newWeek);
    setEditingWeekId(newWeek.id);
  };
  
  const handleDayChange = (weekId: string, dayIndex: number, updatedDay: WorkDay) => {
    const week = weeks.find(w => w.id === weekId);
    if (!week) return;
    
    const updatedDays = [...week.days];
    updatedDays[dayIndex] = updatedDay;
    
    onUpdateWeek({ ...week, days: updatedDays });
  };
  
  const toggleEditWeek = (weekId: string) => {
    setEditingWeekId(editingWeekId === weekId ? null : weekId);
  };
  
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="bg-byggnads-gray-50 px-6 py-4 border-b border-byggnads-gray-200">
          <h2 className="text-xl font-bold text-byggnads-dark">Lägg till vecka</h2>
        </div>
        <div className="p-6">
        
          <div className="space-y-4">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="block text-sm font-semibold text-byggnads-gray-700 mb-2">
                  År
                </label>
                <input
                  type="number"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="input-field"
                  min="2020"
                  max="2030"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-byggnads-gray-700 mb-2">
                  Veckonummer
                </label>
                <input
                  type="number"
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                  className="input-field"
                  min="1"
                  max="53"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-byggnads-gray-700 mb-2">
                  Veckonorm (timmar)
                </label>
                <input
                  type="number"
                  value={weeklyNorm}
                  onChange={(e) => setWeeklyNorm(parseFloat(e.target.value) || 40)}
                  className="input-field w-24"
                  min="0"
                  max="168"
                  step="0.5"
                  placeholder="40"
                />
              </div>
            </div>
            
            <div className="border-t border-byggnads-gray-200 pt-4 mt-4">
              <h3 className="text-sm font-semibold text-byggnads-gray-700 mb-3">
                Standardarbetstider (Mån-Fre)
              </h3>
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <label className="block text-sm font-semibold text-byggnads-gray-700 mb-2">
                    Starttid
                  </label>
                  <input
                    type="time"
                    value={defaultStartTime}
                    onChange={(e) => setDefaultStartTime(e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-byggnads-gray-700 mb-2">
                    Sluttid
                  </label>
                  <input
                    type="time"
                    value={defaultEndTime}
                    onChange={(e) => setDefaultEndTime(e.target.value)}
                    className="input-field"
                  />
                </div>
                
                <button
                  onClick={handleAddWeek}
                  className="btn-primary"
                >
                  Lägg till vecka
                </button>
              </div>
              <p className="text-xs text-byggnads-gray-500 mt-3">
                Dessa tider tillämpas på dagar inom din standardarbetsvecka när veckan läggs till. Övriga dagar lämnas tomma men kan redigeras efter behov.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {weeks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-byggnads-dark">Dina veckor</h2>
          
          {weeks.sort((a, b) => a.year === b.year ? a.weekNumber - b.weekNumber : a.year - b.year).map((week) => (
            <div
              key={week.id}
              className="card"
            >
              <div className="bg-byggnads-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-byggnads-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-byggnads-dark">
                    Vecka {week.weekNumber}, {week.year}
                  </h3>
                  <p className="text-sm text-byggnads-gray-600">
                    Veckonorm: {week.weeklyNorm}h
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleEditWeek(week.id)}
                    className="px-4 py-2 bg-byggnads-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-byggnads-blue-600 transition shadow-sm"
                  >
                    {editingWeekId === week.id ? 'Dölj' : 'Redigera'}
                  </button>
                  <button
                    onClick={() => onCopyWeek(week)}
                    className="px-4 py-2 bg-byggnads-gray-600 text-white text-sm font-semibold rounded-lg hover:bg-byggnads-gray-700 transition shadow-sm"
                  >
                    Kopiera till nästa vecka
                  </button>
                  <button
                    onClick={() => onDeleteWeek(week.id)}
                    className="px-4 py-2 bg-byggnads-red text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition shadow-sm"
                  >
                    Ta bort
                  </button>
                </div>
              </div>
              
              {editingWeekId === week.id && (
                <div className="px-6 py-4 bg-white">
                  {week.days.map((day, index) => (
                    <DayRow
                      key={day.date}
                      day={day}
                      onChange={(updatedDay) => handleDayChange(week.id, index, updatedDay)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
