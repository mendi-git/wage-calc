# Löneberäkning - Byggnads

A modern wage calculator application built with React, TypeScript, and Tailwind CSS following the Byggnads design language. This application calculates wages with overtime (OT/OV) and inconvenient hours bonuses (OB) based on Swedish construction industry labor regulations.

## Features

- **Week-based input**: Add multiple weeks with customizable weekly norms (40h, 48h, 50h)
- **Day-by-day editing**: Set start and end times for each day of the week
- **Sick day support**: Track sick days with proper compensation calculations
- **Overtime calculation**: Automatic calculation of overtime based on:
  - Daily excess hours (after day norm)
  - Weekly excess hours (after weekly norm)
- **Inconvenient hours bonuses (OB)**:
  - OB1 (20%): 05:00-06:00 on weekdays
  - OB2 (40%): 18:00-22:00 on weekdays
  - OB3 (70%): 22:00-05:00 on weekdays, all weekend hours
- **Overtime rates (OV)**:
  - OVA (30%): 06:00-17:00 on weekdays
  - OVB (50%): 05:00, 17:00-19:00 on weekdays
  - OVC (70%): 19:00-22:00 on weekdays
  - OVD (100%): 22:00-05:00 on weekdays, all weekend hours
- **Copy week feature**: Quickly populate the next week with the same schedule
- **Detailed breakdown**: See daily, weekly, and total wage breakdowns
- **Automatic break**: Unpaid 1-hour break after 5 hours of work

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── DayRow.tsx      # Individual day input component
│   ├── WeekInput.tsx   # Week management component
│   └── Summary.tsx     # Results display component
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── constants.ts    # Rate constants and labels
│   ├── timeUtils.ts    # Time/date utilities
│   ├── blockUtils.ts   # Block classification logic
│   └── wageCalculator.ts  # Main calculation logic
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## Usage

1. **Set your hourly wage**: Enter your hourly wage in SEK at the top
2. **Add weeks**: Select year, week number, and weekly norm, then click "Add Week"
3. **Edit work times**: Click "Edit" on a week to set start/end times for each day
4. **Mark sick days**: Check the "Sick" checkbox for sick days
5. **Copy schedule**: Use "Copy to Next Week" to duplicate a week's schedule
6. **Calculate wages**: Click "Calculate Wages" to see the breakdown

## Technologies

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

## License

MIT
