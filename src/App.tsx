import { useState } from 'react';
import { Week, CalculationResult, WorkDay, DayOfWeekNumber } from './types';
import { WeekInput } from './components/WeekInput';
import { Summary } from './components/Summary';
import { LanguagePicker } from './components/LanguagePicker';
import { calculateWages } from './utils/wageCalculator';
import { getDateFromWeekAndDay } from './utils/timeUtils';
import { useLanguage } from './i18n/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [hourlyWage, setHourlyWage] = useState<number>(160);
  const [weeklyNorm, setWeeklyNorm] = useState<number>(40);
  const [workWeekStart, setWorkWeekStart] = useState<DayOfWeekNumber>(1); // Monday
  const [workWeekEnd, setWorkWeekEnd] = useState<DayOfWeekNumber>(5); // Friday
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  const handleAddWeek = (week: Week) => {
    setWeeks([...weeks, week]);
    setResult(null); // Clear results when adding new week
  };
  
  const handleUpdateWeek = (updatedWeek: Week) => {
    setWeeks(weeks.map(w => w.id === updatedWeek.id ? updatedWeek : w));
    setResult(null); // Clear results when updating
  };
  
  const handleDeleteWeek = (weekId: string) => {
    setWeeks(weeks.filter(w => w.id !== weekId));
    setResult(null); // Clear results when deleting
  };
  
  const handleCopyWeek = (week: Week) => {
    // Calculate next week
    const nextWeekNumber = week.weekNumber >= 52 ? 1 : week.weekNumber + 1;
    const nextYear = week.weekNumber >= 52 ? week.year + 1 : week.year;
    
    // Check if next week already exists
    const existingWeek = weeks.find(w => w.year === nextYear && w.weekNumber === nextWeekNumber);
    if (existingWeek) {
      alert(t.nextWeekExists);
      return;
    }
    
    // Create new days with updated dates (all 7 days)
    const newDays: WorkDay[] = week.days.map((day, index) => {
      const dayNum = index + 1; // Monday = 1, Sunday = 7
      const date = getDateFromWeekAndDay(nextYear, nextWeekNumber, dayNum);
      return {
        date,
        dayOfWeek: day.dayOfWeek,
        startTime: day.startTime,
        endTime: day.endTime,
        isSick: false, // Don't copy sick status
      };
    });
    
    const newWeek: Week = {
      id: `${nextYear}-W${nextWeekNumber}`,
      weekNumber: nextWeekNumber,
      year: nextYear,
      weeklyNorm: week.weeklyNorm,
      days: newDays,
    };
    
    setWeeks([...weeks, newWeek]);
    setResult(null);
  };
  
  const handleCalculate = () => {
    if (weeks.length === 0) {
      alert(t.addOneWeek);
      return;
    }
    
    if (hourlyWage <= 0) {
      alert(t.enterValidWage);
      return;
    }
    
    const calculationResult = calculateWages(weeks, hourlyWage, workWeekStart, workWeekEnd);
    setResult(calculationResult);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  return (
    <div className="min-h-screen bg-byggnads-gray-50">
      {/* Header Bar */}
      <div className="bg-byggnads-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 max-w-7xl flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t.title}
            </h1>
            <p className="text-byggnads-blue-100 text-sm md:text-base max-w-3xl">
              {t.subtitle}
            </p>
          </div>
          <LanguagePicker />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Info Banner */}
        <div className="card mb-8 border-l-4 border-byggnads-orange-500">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-byggnads-dark mb-2">{t.infoTitle}</h2>
            <p className="text-byggnads-gray-600 text-sm leading-relaxed mb-2">
              <strong>{t.infoDailyNorm}</strong> {t.infoDailyNormExample}
            </p>
            <p className="text-byggnads-gray-600 text-sm leading-relaxed">
              <strong>{t.infoOvertime}</strong> {t.infoOvertimeDetails} <strong>{t.infoSickPeriod}</strong>
            </p>
          </div>
        </div>
        
        <div className="card mb-8">
          <div className="bg-byggnads-gray-50 px-6 py-4 border-b border-byggnads-gray-200">
            <h2 className="text-xl font-bold text-byggnads-dark">{t.basicSettings}</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-3">
                <span className="text-byggnads-gray-700 font-medium">{t.hourlyWage}</span>
                <input
                  type="number"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(parseFloat(e.target.value) || 0)}
                  className="input-field w-32"
                  min="0"
                  step="0.01"
                  placeholder="160"
                />
              </label>
              
              <label className="flex items-center gap-3">
                <span className="text-byggnads-gray-700 font-medium">{t.weeklyNormHours}</span>
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
              </label>
            </div>
            
            <div className="border-t border-byggnads-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-byggnads-gray-700 mb-3">
                {t.standardWorkWeek}
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2">
                  <span className="text-sm text-byggnads-gray-600 font-medium">{t.from}</span>
                  <select
                    value={workWeekStart}
                    onChange={(e) => setWorkWeekStart(parseInt(e.target.value) as DayOfWeekNumber)}
                    className="input-field py-2"
                  >
                    <option value={1}>{t.monday}</option>
                    <option value={2}>{t.tuesday}</option>
                    <option value={3}>{t.wednesday}</option>
                    <option value={4}>{t.thursday}</option>
                    <option value={5}>{t.friday}</option>
                    <option value={6}>{t.saturday}</option>
                    <option value={7}>{t.sunday}</option>
                  </select>
                </label>
                
                <label className="flex items-center gap-2">
                  <span className="text-sm text-byggnads-gray-600 font-medium">{t.to}</span>
                  <select
                    value={workWeekEnd}
                    onChange={(e) => setWorkWeekEnd(parseInt(e.target.value) as DayOfWeekNumber)}
                    className="input-field py-2"
                  >
                    <option value={1}>{t.monday}</option>
                    <option value={2}>{t.tuesday}</option>
                    <option value={3}>{t.wednesday}</option>
                    <option value={4}>{t.thursday}</option>
                    <option value={5}>{t.friday}</option>
                    <option value={6}>{t.saturday}</option>
                    <option value={7}>{t.sunday}</option>
                  </select>
                </label>
              </div>
              <p className="text-xs text-byggnads-gray-500 mt-2">
                {t.workWeekInfo}
              </p>
            </div>
          </div>
        </div>
        
        <WeekInput
          weeks={weeks}
          onAddWeek={handleAddWeek}
          onUpdateWeek={handleUpdateWeek}
          onDeleteWeek={handleDeleteWeek}
          onCopyWeek={handleCopyWeek}
          weeklyNorm={weeklyNorm}
          workWeekStart={workWeekStart}
          workWeekEnd={workWeekEnd}
        />
        
        {weeks.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleCalculate}
              className="btn-primary text-lg px-10 py-4 transform hover:scale-105"
            >
              {t.calculateWages}
            </button>
          </div>
        )}
        
        {result && (
          <div id="results" className="mt-12">
            <Summary result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
