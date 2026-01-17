import React, { useState } from 'react';
import { Week, CalculationResult, WorkDay, DayOfWeekNumber } from './types';
import { WeekInput } from './components/WeekInput';
import { Summary } from './components/Summary';
import { calculateWages } from './utils/wageCalculator';
import { getDateFromWeekAndDay } from './utils/timeUtils';

function App() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [hourlyWage, setHourlyWage] = useState<number>(160);
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
      alert('Nästa vecka finns redan!');
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
      alert('Lägg till minst en vecka!');
      return;
    }
    
    if (hourlyWage <= 0) {
      alert('Ange en giltig timlön!');
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
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Löneberäkning
          </h1>
          <p className="text-byggnads-blue-100 text-sm md:text-base max-w-3xl">
            Beräkna lön med övertid (OT/OV) och OB-tillägg
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Info Banner */}
        <div className="card mb-8 border-l-4 border-byggnads-orange-500">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-byggnads-dark mb-2">Så fungerar beräkningen</h2>
            <p className="text-byggnads-gray-600 text-sm leading-relaxed mb-2">
              <strong>Dagsnorm:</strong> Veckonormen fördelas jämnt över arbetsdagarna. Ex: 28h veckonorm över mån-tors = 7h/dag.
            </p>
            <p className="text-byggnads-gray-600 text-sm leading-relaxed">
              <strong>Övertid (OV):</strong> (1) alla timmar på dagar utanför standardarbetsveckan, (2) block som överstiger dagsnorm, eller (3) block efter veckonorm. 
              Automatisk obetald rast efter 5 timmar. <strong>Sjukperiod:</strong> Sjukdagar som ligger inom 4 dagar från varandra räknas som en sammanhängande sjukperiod (inkl. helger). Dag 1 = 0 kr / 8h norm, Dag 2-14 = 80% lön / 8h norm, Dag 15+ = 0 kr / 0h.
            </p>
          </div>
        </div>
        
        <div className="card mb-8">
          <div className="bg-byggnads-gray-50 px-6 py-4 border-b border-byggnads-gray-200">
            <h2 className="text-xl font-bold text-byggnads-dark">Grundinställningar</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-3">
                <span className="text-byggnads-gray-700 font-medium">Timlön (SEK):</span>
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
            </div>
            
            <div className="border-t border-byggnads-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-byggnads-gray-700 mb-3">
                Standardarbetsvecka
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2">
                  <span className="text-sm text-byggnads-gray-600 font-medium">Från:</span>
                  <select
                    value={workWeekStart}
                    onChange={(e) => setWorkWeekStart(parseInt(e.target.value) as DayOfWeekNumber)}
                    className="input-field py-2"
                  >
                    <option value={1}>Måndag</option>
                    <option value={2}>Tisdag</option>
                    <option value={3}>Onsdag</option>
                    <option value={4}>Torsdag</option>
                    <option value={5}>Fredag</option>
                    <option value={6}>Lördag</option>
                    <option value={7}>Söndag</option>
                  </select>
                </label>
                
                <label className="flex items-center gap-2">
                  <span className="text-sm text-byggnads-gray-600 font-medium">Till:</span>
                  <select
                    value={workWeekEnd}
                    onChange={(e) => setWorkWeekEnd(parseInt(e.target.value) as DayOfWeekNumber)}
                    className="input-field py-2"
                  >
                    <option value={1}>Måndag</option>
                    <option value={2}>Tisdag</option>
                    <option value={3}>Onsdag</option>
                    <option value={4}>Torsdag</option>
                    <option value={5}>Fredag</option>
                    <option value={6}>Lördag</option>
                    <option value={7}>Söndag</option>
                  </select>
                </label>
              </div>
              <p className="text-xs text-byggnads-gray-500 mt-2">
                Dagar utanför standardarbetsveckan räknas som övertid (OV). Dagsnormen beräknas genom att fördela veckonormen jämnt över arbetsdagarna.
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
          workWeekStart={workWeekStart}
          workWeekEnd={workWeekEnd}
        />
        
        {weeks.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleCalculate}
              className="btn-primary text-lg px-10 py-4 transform hover:scale-105"
            >
              Beräkna lön
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
