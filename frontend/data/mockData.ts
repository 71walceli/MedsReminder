import type { Alarm, AppSettings } from "@/types"

export const initialAlarms: Alarm[] = [
  {
    id: "1",
    medicationName: "Lisinopril",
    dose: "10mg",
    time: "08:00",
    repeatPattern: "Daily",
    isActive: true,
    soundEnabled: true,
    sleepHoursEnabled: true,
    sleepStartTime: "22:00",
    sleepEndTime: "07:00",
    nextAlarm: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    medicationName: "Metformin",
    dose: "500mg",
    time: "12:00",
    repeatPattern: "Custom",
    customHours: 8,
    isActive: true,
    soundEnabled: true,
    sleepHoursEnabled: false,
    nextAlarm: new Date(Date.now() + 6 * 60 * 60 * 1000),
  },
  {
    id: "3",
    medicationName: "Vitamin D",
    time: "20:00",
    repeatPattern: "Daily",
    isActive: false,
    soundEnabled: false,
    sleepHoursEnabled: true,
    sleepStartTime: "23:00",
    sleepEndTime: "06:00",
    nextAlarm: new Date(Date.now() + 10 * 60 * 60 * 1000),
  },
]

export const initialSettings: AppSettings = {
  volume: 80,
  alarmTone: "Default",
  darkMode: false,
  offlineMode: true,
  batteryOptimization: true,
}
