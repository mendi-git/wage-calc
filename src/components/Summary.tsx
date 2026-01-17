import React from 'react';
import { CalculationResult } from '../types';

interface SummaryProps {
  result: CalculationResult | null;
}

export const Summary: React.FC<SummaryProps> = ({ result }) => {
  if (!result) {
    return null;
  }
  
  const fmt = (n: number) => n.toFixed(2);
  
  const DAY_NAMES_SV: Record<string, string> = {
    'Monday': 'Måndag',
    'Tuesday': 'Tisdag',
    'Wednesday': 'Onsdag',
    'Thursday': 'Torsdag',
    'Friday': 'Fredag',
    'Saturday': 'Lördag',
    'Sunday': 'Söndag',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-byggnads-dark">Lönesammanfattning</h2>
      
      {result.weeks.map((week) => (
        <div key={`${week.year}-W${week.weekNumber}`} className="card">
          <div className="bg-byggnads-blue-500 text-white px-6 py-4">
            <h3 className="text-xl font-bold">
              Vecka {week.weekNumber}, {week.year}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-byggnads-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">Datum</th>
                  <th className="px-4 py-3 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">Bas</th>
                  <th className="px-4 py-3 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">OB1 (20%)</th>
                  <th className="px-4 py-3 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">OB2 (40%)</th>
                  <th className="px-4 py-3 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">OB3 (70%)</th>
                  <th className="px-4 py-3 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">OVA (30%)</th>
                  <th className="px-4 py-3 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">OVB (50%)</th>
                  <th className="px-4 py-3 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">OVC (70%)</th>
                  <th className="px-4 py-3 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">OVD (100%)</th>
                  <th className="px-4 py-3 text-right font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300">Dags total</th>
                </tr>
              </thead>
              <tbody>
                {week.days.map((day) => (
                  <tr key={day.date} className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-byggnads-dark">{day.date}</div>
                      <div className="text-xs text-byggnads-gray-600">{DAY_NAMES_SV[day.dayOfWeek] || day.dayOfWeek}</div>
                      {day.startTime && day.endTime && (
                        <div className="text-xs text-byggnads-gray-600">{day.startTime}–{day.endTime}</div>
                      )}
                      {day.isSick && (
                        <div className="text-xs text-byggnads-orange-600 font-semibold">Sjukdag {day.sickDay}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="font-semibold text-byggnads-dark">{fmt(day.baseHours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(day.basePay)} kr</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {day.OB1Hours > 0 && (
                        <>
                          <div className="font-semibold text-byggnads-dark">{fmt(day.OB1Hours)} h</div>
                          <div className="text-xs text-byggnads-gray-600">{fmt(day.OB1Pay)} kr</div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {day.OB2Hours > 0 && (
                        <>
                          <div className="font-semibold text-byggnads-dark">{fmt(day.OB2Hours)} h</div>
                          <div className="text-xs text-byggnads-gray-600">{fmt(day.OB2Pay)} kr</div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {day.OB3Hours > 0 && (
                        <>
                          <div className="font-semibold text-byggnads-dark">{fmt(day.OB3Hours)} h</div>
                          <div className="text-xs text-byggnads-gray-600">{fmt(day.OB3Pay)} kr</div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {day.OVAHours > 0 && (
                        <>
                          <div className="font-semibold text-byggnads-dark">{fmt(day.OVAHours)} h</div>
                          <div className="text-xs text-byggnads-gray-600">{fmt(day.OVAPay)} kr</div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {day.OVBHours > 0 && (
                        <>
                          <div className="font-semibold text-byggnads-dark">{fmt(day.OVBHours)} h</div>
                          <div className="text-xs text-byggnads-gray-600">{fmt(day.OVBPay)} kr</div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {day.OVCHours > 0 && (
                        <>
                          <div className="font-semibold text-byggnads-dark">{fmt(day.OVCHours)} h</div>
                          <div className="text-xs text-byggnads-gray-600">{fmt(day.OVCPay)} kr</div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {day.OVDHours > 0 && (
                        <>
                          <div className="font-semibold text-byggnads-dark">{fmt(day.OVDHours)} h</div>
                          <div className="text-xs text-byggnads-gray-600">{fmt(day.OVDPay)} kr</div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="font-bold text-byggnads-orange-600 text-base">{fmt(day.totalPay)}</div>
                      <div className="text-xs text-byggnads-gray-600">kr</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-byggnads-gray-50 px-6 py-5 border-t-2 border-byggnads-gray-300">
            <h4 className="font-bold text-byggnads-dark mb-3 text-base">Veckosammanfattning</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                <span className="text-byggnads-gray-600 font-medium">Totala timmar:</span>
                <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.totalHours)} h</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                <span className="text-byggnads-gray-600 font-medium">Bas:</span>
                <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.baseHours)} h / {fmt(week.basePay)} kr</span>
              </div>
              {week.OB1Hours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OB1 (20%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OB1Hours)} h / {fmt(week.OB1Pay)} kr</span>
                </div>
              )}
              {week.OB2Hours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OB2 (40%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OB2Hours)} h / {fmt(week.OB2Pay)} kr</span>
                </div>
              )}
              {week.OB3Hours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OB3 (70%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OB3Hours)} h / {fmt(week.OB3Pay)} kr</span>
                </div>
              )}
              {week.OVAHours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OVA (30%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OVAHours)} h / {fmt(week.OVAPay)} kr</span>
                </div>
              )}
              {week.OVBHours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OVB (50%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OVBHours)} h / {fmt(week.OVBPay)} kr</span>
                </div>
              )}
              {week.OVCHours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OVC (70%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OVCHours)} h / {fmt(week.OVCPay)} kr</span>
                </div>
              )}
              {week.OVDHours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OVD (100%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OVDHours)} h / {fmt(week.OVDPay)} kr</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t-2 border-byggnads-orange-500">
              <div className="text-xl font-bold text-byggnads-orange-600">
                Vecka total: {fmt(week.totalPay)} kr
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {result.weeks.length > 1 && (
        <div className="card border-4 border-byggnads-orange-500 shadow-xl">
          <div className="bg-gradient-to-r from-byggnads-orange-500 to-byggnads-orange-600 text-white px-6 py-5">
            <h3 className="text-2xl font-bold">Total (Alla veckor)</h3>
          </div>
          
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
              <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                <span className="text-byggnads-gray-700 font-medium">Totala timmar:</span>
                <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.totalHours)} h</span>
              </div>
              <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                <span className="text-byggnads-gray-700 font-medium">Bas:</span>
                <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.baseHours)} h / {fmt(result.grandTotal.basePay)} kr</span>
              </div>
              {result.grandTotal.OB1Hours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OB1 (20%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OB1Hours)} h / {fmt(result.grandTotal.OB1Pay)} kr</span>
                </div>
              )}
              {result.grandTotal.OB2Hours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OB2 (40%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OB2Hours)} h / {fmt(result.grandTotal.OB2Pay)} kr</span>
                </div>
              )}
              {result.grandTotal.OB3Hours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OB3 (70%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OB3Hours)} h / {fmt(result.grandTotal.OB3Pay)} kr</span>
                </div>
              )}
              {result.grandTotal.OVAHours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OVA (30%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OVAHours)} h / {fmt(result.grandTotal.OVAPay)} kr</span>
                </div>
              )}
              {result.grandTotal.OVBHours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OVB (50%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OVBHours)} h / {fmt(result.grandTotal.OVBPay)} kr</span>
                </div>
              )}
              {result.grandTotal.OVCHours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OVC (70%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OVCHours)} h / {fmt(result.grandTotal.OVCPay)} kr</span>
                </div>
              )}
              {result.grandTotal.OVDHours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OVD (100%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OVDHours)} h / {fmt(result.grandTotal.OVDPay)} kr</span>
                </div>
              )}
            </div>
            
            <div className="pt-5 border-t-4 border-byggnads-orange-500 bg-gradient-to-br from-byggnads-orange-50 to-white rounded-lg px-6 py-4">
              <div className="text-3xl font-bold text-byggnads-orange-600">
                Total lön: {fmt(result.grandTotal.totalPay)} kr
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
