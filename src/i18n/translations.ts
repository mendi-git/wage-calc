export type Language = 'sv' | 'en' | 'pl' | 'ru';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  
  // Info banner
  infoTitle: string;
  infoDailyNorm: string;
  infoDailyNormExample: string;
  infoOvertime: string;
  infoOvertimeDetails: string;
  infoSickPeriod: string;
  
  // Basic settings
  basicSettings: string;
  hourlyWage: string;
  standardWorkWeek: string;
  from: string;
  to: string;
  workWeekInfo: string;
  
  // Days of week
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  
  // Days abbreviated
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
  
  // Add week
  addWeek: string;
  year: string;
  weekNumber: string;
  weeklyNorm: string;
  weeklyNormHours: string;
  defaultSchedule: string;
  startTime: string;
  endTime: string;
  scheduleInfo: string;
  
  // Week list
  yourWeeks: string;
  week: string;
  weekNorm: string;
  edit: string;
  hide: string;
  copyToNextWeek: string;
  delete: string;
  
  // Day row
  sick: string;
  clear: string;
  start: string;
  end: string;
  weekend: string;
  
  // Calculate
  calculateWages: string;
  
  // Summary
  wageSummary: string;
  category: string;
  total: string;
  sickDay: string;
  
  // Categories
  base: string;
  regularTime: string;
  weekdays: string;
  weekends: string;
  
  // Week summary
  weekSummary: string;
  totalHours: string;
  
  // Grand total
  grandTotal: string;
  allWeeks: string;
  totalPay: string;
  
  // Alerts
  weekExists: string;
  nextWeekExists: string;
  addOneWeek: string;
  enterValidWage: string;
  
  // Currency
  currency: string;
  hours: string;
}

export const translations: Record<Language, Translations> = {
  sv: {
    title: 'Löneberäkning',
    subtitle: 'Beräkna lön med övertid och OB-tillägg',
    
    infoTitle: 'Så fungerar beräkningen',
    infoDailyNorm: 'Dagsnorm:',
    infoDailyNormExample: 'Veckonormen fördelas jämnt över arbetsdagarna. Ex: 28h veckonorm över mån-tors = 7h/dag.',
    infoOvertime: 'Övertid (OV):',
    infoOvertimeDetails: '(1) alla timmar på dagar utanför standardarbetsveckan, (2) block som överstiger dagsnorm, eller (3) block efter veckonorm. Automatisk obetald rast efter 5 timmar.',
    infoSickPeriod: 'Sjukperiod: Sjukdagar som ligger inom 4 dagar från varandra räknas som en sammanhängande sjukperiod (inkl. helger). Dag 1 = 0 kr / 8h norm, Dag 2-14 = 80% lön / 8h norm, Dag 15+ = 0 kr / 0h.',
    
    basicSettings: 'Grundinställningar',
    hourlyWage: 'Timlön (SEK):',
    standardWorkWeek: 'Standardarbetsvecka',
    from: 'Från:',
    to: 'Till:',
    workWeekInfo: 'Dagar utanför standardarbetsveckan räknas som övertid (OV). Dagsnormen beräknas genom att fördela veckonormen jämnt över arbetsdagarna.',
    
    monday: 'Måndag',
    tuesday: 'Tisdag',
    wednesday: 'Onsdag',
    thursday: 'Torsdag',
    friday: 'Fredag',
    saturday: 'Lördag',
    sunday: 'Söndag',
    
    mon: 'Mån',
    tue: 'Tis',
    wed: 'Ons',
    thu: 'Tor',
    fri: 'Fre',
    sat: 'Lör',
    sun: 'Sön',
    
    addWeek: 'Lägg till vecka',
    year: 'År',
    weekNumber: 'Veckonummer',
    weeklyNorm: 'Veckonorm',
    weeklyNormHours: 'Veckonorm (timmar)',
    defaultSchedule: 'Standardarbetstider (Mån-Fre)',
    startTime: 'Starttid',
    endTime: 'Sluttid',
    scheduleInfo: 'Dessa tider tillämpas på dagar inom din standardarbetsvecka när veckan läggs till. Övriga dagar lämnas tomma men kan redigeras efter behov.',
    
    yourWeeks: 'Dina veckor',
    week: 'Vecka',
    weekNorm: 'Veckonorm',
    edit: 'Redigera',
    hide: 'Dölj',
    copyToNextWeek: 'Kopiera till nästa vecka',
    delete: 'Ta bort',
    
    sick: 'Sjuk',
    clear: 'Rensa',
    start: 'Start',
    end: 'Slut',
    weekend: 'helg',
    
    calculateWages: 'Beräkna lön',
    
    wageSummary: 'Lönesammanfattning',
    category: 'Kategori',
    total: 'Total',
    sickDay: 'Sjukdag',
    
    base: 'Bas',
    regularTime: 'Ordinarie tid',
    weekdays: 'vardagar',
    weekends: 'helger',
    
    weekSummary: 'Veckosammanfattning',
    totalHours: 'Totala timmar',
    
    grandTotal: 'Total',
    allWeeks: 'Alla veckor',
    totalPay: 'Total lön',
    
    weekExists: 'Denna vecka finns redan!',
    nextWeekExists: 'Nästa vecka finns redan!',
    addOneWeek: 'Lägg till minst en vecka!',
    enterValidWage: 'Ange en giltig timlön!',
    
    currency: 'kr',
    hours: 'h',
  },
  
  en: {
    title: 'Wage Calculator',
    subtitle: 'Calculate wages with overtime and inconvenient hours bonuses',
    
    infoTitle: 'How the calculation works',
    infoDailyNorm: 'Daily norm:',
    infoDailyNormExample: 'Weekly norm is distributed evenly across work days. Ex: 28h weekly norm over Mon-Thu = 7h/day.',
    infoOvertime: 'Overtime (OV):',
    infoOvertimeDetails: '(1) all hours on days outside standard work week, (2) blocks exceeding daily norm, or (3) blocks after weekly norm. Automatic unpaid break after 5 hours.',
    infoSickPeriod: 'Sick period: Sick days within 4 days of each other count as one continuous sick period (incl. weekends). Day 1 = 0 SEK / 8h norm, Day 2-14 = 80% pay / 8h norm, Day 15+ = 0 SEK / 0h.',
    
    basicSettings: 'Basic Settings',
    hourlyWage: 'Hourly wage (SEK):',
    standardWorkWeek: 'Standard Work Week',
    from: 'From:',
    to: 'To:',
    workWeekInfo: 'Days outside the standard work week count as overtime (OV). Daily norm is calculated by distributing the weekly norm evenly across work days.',
    
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    
    addWeek: 'Add Week',
    year: 'Year',
    weekNumber: 'Week Number',
    weeklyNorm: 'Weekly Norm',
    weeklyNormHours: 'Weekly Norm (hours)',
    defaultSchedule: 'Default Schedule (Mon-Fri)',
    startTime: 'Start Time',
    endTime: 'End Time',
    scheduleInfo: 'These times are applied to days within your standard work week when the week is added. Other days are left empty but can be edited as needed.',
    
    yourWeeks: 'Your Weeks',
    week: 'Week',
    weekNorm: 'Week norm',
    edit: 'Edit',
    hide: 'Hide',
    copyToNextWeek: 'Copy to next week',
    delete: 'Delete',
    
    sick: 'Sick',
    clear: 'Clear',
    start: 'Start',
    end: 'End',
    weekend: 'weekend',
    
    calculateWages: 'Calculate Wages',
    
    wageSummary: 'Wage Summary',
    category: 'Category',
    total: 'Total',
    sickDay: 'Sick day',
    
    base: 'Base',
    regularTime: 'Regular time',
    weekdays: 'weekdays',
    weekends: 'weekends',
    
    weekSummary: 'Week Summary',
    totalHours: 'Total hours',
    
    grandTotal: 'Total',
    allWeeks: 'All Weeks',
    totalPay: 'Total pay',
    
    weekExists: 'This week already exists!',
    nextWeekExists: 'Next week already exists!',
    addOneWeek: 'Add at least one week!',
    enterValidWage: 'Enter a valid hourly wage!',
    
    currency: 'SEK',
    hours: 'h',
  },
  
  pl: {
    title: 'Kalkulator Wynagrodzeń',
    subtitle: 'Oblicz wynagrodzenie z nadgodzinami i dodatkami',
    
    infoTitle: 'Jak działa kalkulacja',
    infoDailyNorm: 'Norma dzienna:',
    infoDailyNormExample: 'Norma tygodniowa jest równo rozdzielona na dni robocze. Np.: 28h norma tygodniowa pn-czw = 7h/dzień.',
    infoOvertime: 'Nadgodziny (OV):',
    infoOvertimeDetails: '(1) wszystkie godziny w dni poza standardowym tygodniem pracy, (2) bloki przekraczające normę dzienną, lub (3) bloki po przekroczeniu normy tygodniowej. Automatyczna nieodpłatna przerwa po 5 godzinach.',
    infoSickPeriod: 'Okres chorobowy: Dni chorobowe w odstępie do 4 dni liczą się jako jeden ciągły okres (łącznie z weekendami). Dzień 1 = 0 SEK / 8h norma, Dni 2-14 = 80% płacy / 8h norma, Dzień 15+ = 0 SEK / 0h.',
    
    basicSettings: 'Ustawienia Podstawowe',
    hourlyWage: 'Stawka godzinowa (SEK):',
    standardWorkWeek: 'Standardowy Tydzień Pracy',
    from: 'Od:',
    to: 'Do:',
    workWeekInfo: 'Dni poza standardowym tygodniem pracy liczą się jako nadgodziny (OV). Norma dzienna jest obliczana przez równe rozdzielenie normy tygodniowej na dni robocze.',
    
    monday: 'Poniedziałek',
    tuesday: 'Wtorek',
    wednesday: 'Środa',
    thursday: 'Czwartek',
    friday: 'Piątek',
    saturday: 'Sobota',
    sunday: 'Niedziela',
    
    mon: 'Pon',
    tue: 'Wt',
    wed: 'Śr',
    thu: 'Czw',
    fri: 'Pt',
    sat: 'Sob',
    sun: 'Ndz',
    
    addWeek: 'Dodaj Tydzień',
    year: 'Rok',
    weekNumber: 'Numer Tygodnia',
    weeklyNorm: 'Norma Tygodniowa',
    weeklyNormHours: 'Norma tygodniowa (godziny)',
    defaultSchedule: 'Domyślny Harmonogram (Pon-Pt)',
    startTime: 'Czas Rozpoczęcia',
    endTime: 'Czas Zakończenia',
    scheduleInfo: 'Te czasy są stosowane do dni w twoim standardowym tygodniu pracy po dodaniu tygodnia. Inne dni są puste, ale mogą być edytowane w razie potrzeby.',
    
    yourWeeks: 'Twoje Tygodnie',
    week: 'Tydzień',
    weekNorm: 'Norma tygodniowa',
    edit: 'Edytuj',
    hide: 'Ukryj',
    copyToNextWeek: 'Kopiuj na następny tydzień',
    delete: 'Usuń',
    
    sick: 'Chory',
    clear: 'Wyczyść',
    start: 'Start',
    end: 'Koniec',
    weekend: 'weekend',
    
    calculateWages: 'Oblicz Wynagrodzenie',
    
    wageSummary: 'Podsumowanie Wynagrodzeń',
    category: 'Kategoria',
    total: 'Razem',
    sickDay: 'Dzień chorobowy',
    
    base: 'Podstawa',
    regularTime: 'Czas normalny',
    weekdays: 'dni robocze',
    weekends: 'weekendy',
    
    weekSummary: 'Podsumowanie Tygodnia',
    totalHours: 'Łączne godziny',
    
    grandTotal: 'Razem',
    allWeeks: 'Wszystkie Tygodnie',
    totalPay: 'Całkowite wynagrodzenie',
    
    weekExists: 'Ten tydzień już istnieje!',
    nextWeekExists: 'Następny tydzień już istnieje!',
    addOneWeek: 'Dodaj przynajmniej jeden tydzień!',
    enterValidWage: 'Wprowadź prawidłową stawkę godzinową!',
    
    currency: 'SEK',
    hours: 'godz',
  },
  
  ru: {
    title: 'Калькулятор Зарплаты',
    subtitle: 'Рассчитайте зарплату со сверхурочными и надбавками',
    
    infoTitle: 'Как работает расчет',
    infoDailyNorm: 'Дневная норма:',
    infoDailyNormExample: 'Недельная норма распределяется равномерно по рабочим дням. Напр.: 28ч недельная норма пн-чт = 7ч/день.',
    infoOvertime: 'Сверхурочные (OV):',
    infoOvertimeDetails: '(1) все часы в дни вне стандартной рабочей недели, (2) блоки, превышающие дневную норму, или (3) блоки после недельной нормы. Автоматический неоплачиваемый перерыв после 5 часов.',
    infoSickPeriod: 'Больничный период: Больничные дни в пределах 4 дней друг от друга считаются одним непрерывным периодом (включая выходные). День 1 = 0 крон / 8ч норма, Дни 2-14 = 80% оплаты / 8ч норма, День 15+ = 0 крон / 0ч.',
    
    basicSettings: 'Основные Настройки',
    hourlyWage: 'Почасовая ставка (SEK):',
    standardWorkWeek: 'Стандартная Рабочая Неделя',
    from: 'С:',
    to: 'По:',
    workWeekInfo: 'Дни вне стандартной рабочей недели считаются сверхурочными (OV). Дневная норма рассчитывается путем равномерного распределения недельной нормы по рабочим дням.',
    
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    sunday: 'Воскресенье',
    
    mon: 'Пн',
    tue: 'Вт',
    wed: 'Ср',
    thu: 'Чт',
    fri: 'Пт',
    sat: 'Сб',
    sun: 'Вс',
    
    addWeek: 'Добавить Неделю',
    year: 'Год',
    weekNumber: 'Номер Недели',
    weeklyNorm: 'Недельная Норма',
    weeklyNormHours: 'Недельная норма (часы)',
    defaultSchedule: 'Стандартный График (Пн-Пт)',
    startTime: 'Время Начала',
    endTime: 'Время Окончания',
    scheduleInfo: 'Это время применяется к дням в вашей стандартной рабочей неделе при добавлении недели. Другие дни остаются пустыми, но могут быть отредактированы при необходимости.',
    
    yourWeeks: 'Ваши Недели',
    week: 'Неделя',
    weekNorm: 'Недельная норма',
    edit: 'Редактировать',
    hide: 'Скрыть',
    copyToNextWeek: 'Копировать на следующую неделю',
    delete: 'Удалить',
    
    sick: 'Больничный',
    clear: 'Очистить',
    start: 'Начало',
    end: 'Конец',
    weekend: 'выходные',
    
    calculateWages: 'Рассчитать Зарплату',
    
    wageSummary: 'Сводка по Зарплате',
    category: 'Категория',
    total: 'Всего',
    sickDay: 'Больничный день',
    
    base: 'База',
    regularTime: 'Обычное время',
    weekdays: 'будни',
    weekends: 'выходные',
    
    weekSummary: 'Недельная Сводка',
    totalHours: 'Всего часов',
    
    grandTotal: 'Итого',
    allWeeks: 'Все Недели',
    totalPay: 'Общая зарплата',
    
    weekExists: 'Эта неделя уже существует!',
    nextWeekExists: 'Следующая неделя уже существует!',
    addOneWeek: 'Добавьте хотя бы одну неделю!',
    enterValidWage: 'Введите корректную почасовую ставку!',
    
    currency: 'крон',
    hours: 'ч',
  },
};

export const getDayName = (lang: Language, dayOfWeek: string): string => {
  const t = translations[lang];
  const mapping: Record<string, string> = {
    'Monday': t.monday,
    'Tuesday': t.tuesday,
    'Wednesday': t.wednesday,
    'Thursday': t.thursday,
    'Friday': t.friday,
    'Saturday': t.saturday,
    'Sunday': t.sunday,
  };
  return mapping[dayOfWeek] || dayOfWeek;
};

export const getDayAbbr = (lang: Language, dayOfWeek: string): string => {
  const t = translations[lang];
  const mapping: Record<string, string> = {
    'Monday': t.mon,
    'Tuesday': t.tue,
    'Wednesday': t.wed,
    'Thursday': t.thu,
    'Friday': t.fri,
    'Saturday': t.sat,
    'Sunday': t.sun,
  };
  return mapping[dayOfWeek] || dayOfWeek.slice(0, 3);
};
