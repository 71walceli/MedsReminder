"use dom"

import AlarmListScreen from "@/components/screens/AlarmListScreen"
import AlarmTriggerScreen from "@/components/screens/AlarmTriggerScreen"
import CreateEditAlarmScreen from "@/components/screens/CreateEditAlarmScreen"
import SettingsScreen from "@/components/screens/SettingsScreen"
import { Button } from "@/components/ui/button"
import { initialAlarms, initialSettings } from "@/data/mockData"
import type { Alarm, AppSettings } from "@/types"
import { Clock, Home, Moon, Plus, Settings, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"

import "@/styles/global.css"


export default function MedicineReminderApp() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "create" | "settings">("home")
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms)
  const [settings, setSettings] = useState<AppSettings>(initialSettings)
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null)
  const [showAlarmTrigger, setShowAlarmTrigger] = useState<Alarm | null>(null)
  const [nextUpcomingAlarm, setNextUpcomingAlarm] = useState<Alarm | null>(null)

  // Find next upcoming alarmz
  useEffect(() => {
    const activeAlarms = alarms.filter((alarm) => alarm.isActive)
    if (activeAlarms.length > 0) {
      const next = activeAlarms.reduce((prev, current) => (prev.nextAlarm < current.nextAlarm ? prev : current))
      setNextUpcomingAlarm(next)
    } else {
      setNextUpcomingAlarm(null)
    }
  }, [alarms])

  // Simulate alarm trigger (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (alarms.length > 0 && alarms[0].isActive) {
        setShowAlarmTrigger(alarms[0])
      }
    }, 5000) // Show alarm after 5 seconds for demo

    return () => clearTimeout(timer)
  }, [alarms])

  const toggleAlarm = (id: string) => {
    setAlarms((prev) => prev.map((alarm) => (alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm)))
  }

  const deleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id))
  }

  const saveAlarm = (alarmData: Partial<Alarm>) => {
    if (editingAlarm) {
      setAlarms((prev) => prev.map((alarm) => (alarm.id === editingAlarm.id ? { ...alarm, ...alarmData } : alarm)))
    } else {
      const newAlarm: Alarm = {
        id: Date.now().toString(),
        medicationName: alarmData.medicationName || "",
        dose: alarmData.dose,
        time: alarmData.time || "08:00",
        repeatPattern: alarmData.repeatPattern || "Daily",
        isActive: true,
        soundEnabled: alarmData.soundEnabled ?? true,
        nextAlarm: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        customHours: alarmData.customHours,
        sleepHoursEnabled: alarmData.sleepHoursEnabled,
        sleepStartTime: alarmData.sleepStartTime,
        sleepEndTime: alarmData.sleepEndTime,
      }
      setAlarms((prev) => [...prev, newAlarm])
    }
    setEditingAlarm(null)
    setCurrentScreen("home")
  }

  const handleAlarmResponse = (action: "take" | "snooze" | "skip") => {
    // Handle alarm response logic here
    console.log(`Alarm response: ${action}`)
    setShowAlarmTrigger(null)
  }

  return (
    <View className={`min-h-screen ${settings.darkMode ? "dark" : ""}`}>
      <View className="bg-background text-foreground min-h-screen flex flex-col">
        {/* Header */}
        <View className="bg-primary text-primary-foreground p-4 shadow-sm flex-grow-0 flex-shrink-0">
          <View className="flex flex-row items-center justify-between max-w-md mx-auto">
            <h1 className="text-xl font-semibold">MedReminder</h1>
            <Button
              variant="ghost"
              size="icon"
              onPress={() => setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              {settings.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </View>
        </View>


        {/* Main Content */}
        <View className="pb-20 px-4 max-w-md  overflow-y-auto flex-grow">
          {/* Next Upcoming Alarm Card */}
          {nextUpcomingAlarm && (
            <View className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-4 mx-4 mt-4 rounded-r-lg">
              <View className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <View>
                  <Text className="font-medium text-blue-900 dark:text-blue-100">Next: {nextUpcomingAlarm.medicationName}</Text>
                  <Text className="text-sm text-blue-700 dark:text-blue-300">
                    {nextUpcomingAlarm.time} • {nextUpcomingAlarm.repeatPattern}
                  </Text>
                </View>
              </View>
            </View>
          )}
          {currentScreen === "home" && (
            <AlarmListScreen
              alarms={alarms}
              onToggleAlarm={toggleAlarm}
              onDeleteAlarm={deleteAlarm}
              onEditAlarm={(alarm) => {
                setEditingAlarm(alarm)
                setCurrentScreen("create")
              }}
            />
          )}

          {currentScreen === "create" && (
            <CreateEditAlarmScreen
              alarm={editingAlarm}
              onSave={saveAlarm}
              onCancel={() => {
                setEditingAlarm(null)
                setCurrentScreen("home")
              }}
            />
          )}

          {currentScreen === "settings" && <SettingsScreen settings={settings} onUpdateSettings={setSettings} />}
        </View>

        {/* Bottom Navigation */}
        <View className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex-grow-0 flex-shrink-0">
          <View className="flex flex-row justify-around items-center py-2 max-w-md mx-auto">
            <Button
              variant={currentScreen === "home" ? "default" : "ghost"}
              size="sm"
              onPress={() => setCurrentScreen("home")}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Home className="h-5 w-5" />
              <Text className="text-xs">Home</Text>
            </Button>

            <Button
              variant={currentScreen === "create" ? "default" : "ghost"}
              size="sm"
              onPress={() => {
                setEditingAlarm(null)
                setCurrentScreen("create")
              }}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Plus className="h-5 w-5" />
              <Text className="text-xs">Add</Text>
            </Button>

            <Button
              variant={currentScreen === "settings" ? "default" : "ghost"}
              size="sm"
              onPress={() => setCurrentScreen("settings")}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Settings className="h-5 w-5" />
              <Text className="text-xs">Settings</Text>
            </Button>
          </View>
        </View>

        {/* Alarm Trigger Modal */}
        {showAlarmTrigger && <AlarmTriggerScreen alarm={showAlarmTrigger} onResponse={handleAlarmResponse} />}
      </View>
    </View>
  )
}
