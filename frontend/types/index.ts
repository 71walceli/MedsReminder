export interface Alarm {
  id: string
  medicationName: string
  dose?: string
  time: string
  repeatPattern: string
  customHours?: number
  isActive: boolean
  soundEnabled: boolean
  sleepHoursEnabled?: boolean
  sleepStartTime?: string
  sleepEndTime?: string
  nextAlarm: Date
}

export interface AppSettings {
  volume: number
  alarmTone: string
  darkMode: boolean
  offlineMode: boolean
  batteryOptimization: boolean
}
