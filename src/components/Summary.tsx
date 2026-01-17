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
            <table className="w-full text-xs">
              <thead className="bg-byggnads-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300 sticky left-0 bg-byggnads-gray-100 z-10">Kategori</th>
                  {week.days.map((day) => (
                    <th key={day.date} className="px-2 py-2 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300 min-w-[100px]">
                      <div className="font-semibold">{day.date.split('-').slice(1).join('-')}</div>
                      <div className="text-xs font-normal text-byggnads-gray-600">{DAY_NAMES_SV[day.dayOfWeek]?.slice(0,3)}</div>
                      {day.startTime && day.endTime && (
                        <div className="text-xs font-normal text-byggnads-gray-600">{day.startTime}–{day.endTime}</div>
                      )}
                      {day.isSick && (
                        <div className="text-xs font-semibold text-byggnads-orange-600">Sjuk {day.sickDay}</div>
                      )}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-right font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300 sticky right-0 bg-byggnads-gray-100 z-10">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Base Hours Row */}
                <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                  <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                    <div>Bas</div>
                    <div className="text-xs font-normal text-byggnads-gray-500">Ordinarie tid</div>
                  </td>
                  {week.days.map((day) => (
                    <td key={day.date} className="px-2 py-2 text-center">
                      <div className="font-semibold text-byggnads-dark">{fmt(day.baseHours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(day.basePay)} kr</div>
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                    <div className="text-byggnads-dark">{fmt(week.baseHours)} h</div>
                    <div className="text-xs text-byggnads-gray-600">{fmt(week.basePay)} kr</div>
                  </td>
                </tr>

                {/* OB1 Row - only show if there are OB1 hours */}
                {week.OB1Hours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OB1 (20%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">05:00–06:00 vardagar</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OB1Hours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OB1Hours)} h</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OB1Pay)} kr</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OB1Hours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OB1Pay)} kr</div>
                    </td>
                  </tr>
                )}

                {/* OB2 Row */}
                {week.OB2Hours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OB2 (40%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">18:00–22:00 vardagar</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OB2Hours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OB2Hours)} h</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OB2Pay)} kr</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OB2Hours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OB2Pay)} kr</div>
                    </td>
                  </tr>
                )}

                {/* OB3 Row */}
                {week.OB3Hours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OB3 (70%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">22:00–05:00, helger</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OB3Hours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OB3Hours)} h</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OB3Pay)} kr</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OB3Hours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OB3Pay)} kr</div>
                    </td>
                  </tr>
                )}

                {/* OVA Row */}
                {week.OVAHours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OVA (30%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">06:00–17:00 vardagar</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OVAHours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OVAHours)} h</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OVAPay)} kr</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OVAHours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OVAPay)} kr</div>
                    </td>
                  </tr>
                )}

                {/* OVB Row */}
                {week.OVBHours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OVB (50%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">05:00, 17:00–19:00 vardagar</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OVBHours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OVBHours)} h</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OVBPay)} kr</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OVBHours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OVBPay)} kr</div>
                    </td>
                  </tr>
                )}

                {/* OVC Row */}
                {week.OVCHours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OVC (70%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">19:00–22:00 vardagar</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OVCHours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OVCHours)} h</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OVCPay)} kr</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OVCHours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OVCPay)} kr</div>
                    </td>
                  </tr>
                )}

                {/* OVD Row */}
                {week.OVDHours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OVD (100%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">22:00–05:00, helger</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OVDHours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OVDHours)} h</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OVDPay)} kr</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OVDHours)} h</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OVDPay)} kr</div>
                    </td>
                  </tr>
                )}

                {/* Total Row */}
                <tr className="border-t-2 border-byggnads-orange-500 bg-byggnads-orange-50">
                  <td className="px-3 py-2 font-bold text-byggnads-dark sticky left-0 bg-byggnads-orange-50 z-10">
                    <div>Total</div>
                  </td>
                  {week.days.map((day) => (
                    <td key={day.date} className="px-2 py-2 text-center">
                      <div className="font-bold text-byggnads-orange-600 text-sm">{fmt(day.totalPay)}</div>
                      <div className="text-xs text-byggnads-gray-600">kr</div>
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right font-bold sticky right-0 bg-byggnads-orange-50 z-10">
                    <div className="text-byggnads-orange-600 text-base">{fmt(week.totalPay)}</div>
                    <div className="text-xs text-byggnads-gray-600">kr</div>
                  </td>
                </tr>
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
