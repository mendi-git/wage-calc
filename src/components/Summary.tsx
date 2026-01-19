import React from 'react';
import { CalculationResult } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getDayAbbr } from '../i18n/translations';
import { getWeekDateRange, formatDateRange } from '../utils/timeUtils';

interface SummaryProps {
  result: CalculationResult | null;
}

export const Summary: React.FC<SummaryProps> = ({ result }) => {
  const { t, language } = useLanguage();
  
  if (!result) {
    return null;
  }
  
  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-byggnads-dark">{t.wageSummary}</h2>
      
      {result.weeks.map((week) => (
        <div key={`${week.year}-W${week.weekNumber}`} className="card">
          <div className="bg-byggnads-blue-500 text-white px-6 py-4">
            <h3 className="text-xl font-bold">
              {t.week} {week.weekNumber}, {week.year}
            </h3>
            <p className="text-sm text-byggnads-blue-100 mt-1">
              {(() => {
                const dateRange = getWeekDateRange(week.year, week.weekNumber);
                return formatDateRange(dateRange.start, dateRange.end);
              })()}
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-byggnads-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300 sticky left-0 bg-byggnads-gray-100 z-10">{t.category}</th>
                  {week.days.map((day) => (
                    <th key={day.date} className="px-2 py-2 text-center font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300 min-w-[100px]">
                      <div className="font-semibold">{day.date.split('-').slice(1).join('-')}</div>
                      <div className="text-xs font-normal text-byggnads-gray-600">{getDayAbbr(language, day.dayOfWeek)}</div>
                      {day.startTime && day.endTime && (
                        <div className="text-xs font-normal text-byggnads-gray-600">{day.startTime}–{day.endTime}</div>
                      )}
                      {day.isSick && (
                        <div className="text-xs font-semibold text-byggnads-orange-600">{t.sickDay} {day.sickDay}</div>
                      )}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-right font-bold text-byggnads-dark border-b-2 border-byggnads-gray-300 sticky right-0 bg-byggnads-gray-100 z-10">{t.total}</th>
                </tr>
              </thead>
              <tbody>
                {/* Base Hours Row */}
                <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                  <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                    <div>{t.base}</div>
                    <div className="text-xs font-normal text-byggnads-gray-500">{t.regularTime}</div>
                  </td>
                  {week.days.map((day) => (
                    <td key={day.date} className="px-2 py-2 text-center">
                      <div className="font-semibold text-byggnads-dark">{fmt(day.baseHours)} {t.hours}</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(day.basePay)} {t.currency}</div>
                    </td>
                  ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                    <div className="text-byggnads-dark">{fmt(week.baseHours)} {t.hours}</div>
                    <div className="text-xs text-byggnads-gray-600">{fmt(week.basePay)} {t.currency}</div>
                  </td>
                </tr>

                {/* OB1 Row - only show if there are OB1 hours */}
                {week.OB1Hours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OB1 (20%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">05:00–06:00 {t.weekdays}</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OB1Hours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OB1Hours)} {t.hours}</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OB1Pay)} {t.currency}</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OB1Hours)} {t.hours}</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OB1Pay)} {t.currency}</div>
                    </td>
                  </tr>
                )}

                {/* OB2 Row */}
                {week.OB2Hours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OB2 (40%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">18:00–22:00 {t.weekdays}</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OB2Hours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OB2Hours)} {t.hours}</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OB2Pay)} {t.currency}</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OB2Hours)} {t.hours}</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OB2Pay)} {t.currency}</div>
                    </td>
                  </tr>
                )}

                {/* OB3 Row */}
                {week.OB3Hours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OB3 (70%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">22:00–05:00, {t.weekends}</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OB3Hours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OB3Hours)} {t.hours}</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OB3Pay)} {t.currency}</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OB3Hours)} {t.hours}</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OB3Pay)} {t.currency}</div>
                    </td>
                  </tr>
                )}

                {/* OVA Row */}
                {week.OVAHours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OVA (30%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">06:00–17:00 {t.weekdays}</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OVAHours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OVAHours)} {t.hours}</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OVAPay)} {t.currency}</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OVAHours)} {t.hours}</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OVAPay)} {t.currency}</div>
                    </td>
                  </tr>
                )}

                {/* OVB Row */}
                {week.OVBHours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OVB (50%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">05:00, 17:00–19:00 {t.weekdays}</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OVBHours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OVBHours)} {t.hours}</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OVBPay)} {t.currency}</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OVBHours)} {t.hours}</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OVBPay)} {t.currency}</div>
                    </td>
                  </tr>
                )}

                {/* OVC Row */}
                {week.OVCHours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OVC (70%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">19:00–22:00 {t.weekdays}</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OVCHours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OVCHours)} {t.hours}</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OVCPay)} {t.currency}</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OVCHours)} {t.hours}</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OVCPay)} {t.currency}</div>
                    </td>
                  </tr>
                )}

                {/* OVD Row */}
                {week.OVDHours > 0 && (
                  <tr className="border-b border-byggnads-gray-200 hover:bg-byggnads-gray-50 transition">
                    <td className="px-3 py-2 font-semibold text-byggnads-dark sticky left-0 bg-white z-10">
                      <div>OVD (100%)</div>
                      <div className="text-xs font-normal text-byggnads-gray-500">22:00–05:00, {t.weekends}</div>
                    </td>
                    {week.days.map((day) => (
                      <td key={day.date} className="px-2 py-2 text-center">
                        {day.OVDHours > 0 && (
                          <>
                            <div className="font-semibold text-byggnads-dark">{fmt(day.OVDHours)} {t.hours}</div>
                            <div className="text-xs text-byggnads-gray-600">{fmt(day.OVDPay)} {t.currency}</div>
                          </>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold sticky right-0 bg-white z-10">
                      <div className="text-byggnads-dark">{fmt(week.OVDHours)} {t.hours}</div>
                      <div className="text-xs text-byggnads-gray-600">{fmt(week.OVDPay)} {t.currency}</div>
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
            <h4 className="font-bold text-byggnads-dark mb-3 text-base">{t.weekSummary}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                <span className="text-byggnads-gray-600 font-medium">{t.totalHours}:</span>
                <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.totalHours)} {t.hours}</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                <span className="text-byggnads-gray-600 font-medium">{t.base}:</span>
                <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.baseHours)} {t.hours} / {fmt(week.basePay)} {t.currency}</span>
              </div>
              {week.OB1Hours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OB1 (20%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OB1Hours)} {t.hours} / {fmt(week.OB1Pay)} {t.currency}</span>
                </div>
              )}
              {week.OB2Hours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OB2 (40%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OB2Hours)} {t.hours} / {fmt(week.OB2Pay)} {t.currency}</span>
                </div>
              )}
              {week.OB3Hours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OB3 (70%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OB3Hours)} {t.hours} / {fmt(week.OB3Pay)} {t.currency}</span>
                </div>
              )}
              {week.OVAHours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OVA (30%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OVAHours)} {t.hours} / {fmt(week.OVAPay)} {t.currency}</span>
                </div>
              )}
              {week.OVBHours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OVB (50%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OVBHours)} {t.hours} / {fmt(week.OVBPay)} {t.currency}</span>
                </div>
              )}
              {week.OVCHours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OVC (70%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OVCHours)} {t.hours} / {fmt(week.OVCPay)} {t.currency}</span>
                </div>
              )}
              {week.OVDHours > 0 && (
                <div className="bg-white px-3 py-2 rounded-lg border border-byggnads-gray-200">
                  <span className="text-byggnads-gray-600 font-medium">OVD (100%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark">{fmt(week.OVDHours)} {t.hours} / {fmt(week.OVDPay)} {t.currency}</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t-2 border-byggnads-orange-500">
              <div className="text-xl font-bold text-byggnads-orange-600">
                {t.week} {t.total}: {fmt(week.totalPay)} {t.currency}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {result.weeks.length > 1 && (
        <div className="card border-4 border-byggnads-orange-500 shadow-xl">
          <div className="bg-gradient-to-r from-byggnads-orange-500 to-byggnads-orange-600 text-white px-6 py-5">
            <h3 className="text-2xl font-bold">{t.grandTotal} ({t.allWeeks})</h3>
          </div>
          
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
              <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                <span className="text-byggnads-gray-700 font-medium">{t.totalHours}:</span>
                <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.totalHours)} {t.hours}</span>
              </div>
              <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                <span className="text-byggnads-gray-700 font-medium">Bas:</span>
                <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.baseHours)} {t.hours} / {fmt(result.grandTotal.basePay)} {t.currency}</span>
              </div>
              {result.grandTotal.OB1Hours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OB1 (20%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OB1Hours)} {t.hours} / {fmt(result.grandTotal.OB1Pay)} {t.currency}</span>
                </div>
              )}
              {result.grandTotal.OB2Hours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OB2 (40%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OB2Hours)} {t.hours} / {fmt(result.grandTotal.OB2Pay)} {t.currency}</span>
                </div>
              )}
              {result.grandTotal.OB3Hours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OB3 (70%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OB3Hours)} {t.hours} / {fmt(result.grandTotal.OB3Pay)} {t.currency}</span>
                </div>
              )}
              {result.grandTotal.OVAHours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OVA (30%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OVAHours)} {t.hours} / {fmt(result.grandTotal.OVAPay)} {t.currency}</span>
                </div>
              )}
              {result.grandTotal.OVBHours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OVB (50%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OVBHours)} {t.hours} / {fmt(result.grandTotal.OVBPay)} {t.currency}</span>
                </div>
              )}
              {result.grandTotal.OVCHours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OVC (70%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OVCHours)} {t.hours} / {fmt(result.grandTotal.OVCPay)} {t.currency}</span>
                </div>
              )}
              {result.grandTotal.OVDHours > 0 && (
                <div className="bg-byggnads-gray-50 px-4 py-3 rounded-lg border border-byggnads-gray-300">
                  <span className="text-byggnads-gray-700 font-medium">OVD (100%):</span>
                  <span className="ml-2 font-bold text-byggnads-dark text-base">{fmt(result.grandTotal.OVDHours)} {t.hours} / {fmt(result.grandTotal.OVDPay)} {t.currency}</span>
                </div>
              )}
            </div>
            
            <div className="pt-5 border-t-4 border-byggnads-orange-500 bg-gradient-to-br from-byggnads-orange-50 to-white rounded-lg px-6 py-4">
              <div className="text-3xl font-bold text-byggnads-orange-600">
                {t.totalPay}: {fmt(result.grandTotal.totalPay)} {t.currency}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
