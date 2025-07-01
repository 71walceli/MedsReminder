import { Bell, Clock, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import type { Alarm } from "@/types"

interface AlarmListScreenProps {
  alarms: Alarm[]
  onToggleAlarm: (id: string) => void
  onDeleteAlarm: (id: string) => void
  onEditAlarm: (alarm: Alarm) => void
}

export default function AlarmListScreen({ alarms, onToggleAlarm, onDeleteAlarm, onEditAlarm }: AlarmListScreenProps) {
  return (
    <div className="py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Medications</h2>
        <Badge variant="secondary" className="text-sm">
          {alarms.filter((a) => a.isActive).length} Active
        </Badge>
      </div>

      {alarms.length === 0 ? (
        <Card className="p-8 text-center">
          <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No medications yet</h3>
          <p className="text-muted-foreground mb-4">Add your first medication reminder to get started.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {alarms.map((alarm) => (
            <Card key={alarm.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{alarm.medicationName}</h3>
                    {alarm.dose && (
                      <Badge variant="outline" className="text-xs">
                        {alarm.dose}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {alarm.time}
                    </span>
                    <span>
                      {alarm.repeatPattern === "Custom" ? `Every ${alarm.customHours}h` : alarm.repeatPattern}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={alarm.isActive ? "default" : "secondary"}>
                      {alarm.isActive ? "Active" : "Paused"}
                    </Badge>
                    {alarm.soundEnabled && <Volume2 className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Switch
                    checked={alarm.isActive}
                    onCheckedChange={() => onToggleAlarm(alarm.id)}
                    aria-label={`Toggle ${alarm.medicationName} alarm`}
                  />
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditAlarm(alarm)}
                      aria-label={`Edit ${alarm.medicationName} alarm`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteAlarm(alarm.id)}
                      className="text-destructive hover:text-destructive"
                      aria-label={`Delete ${alarm.medicationName} alarm`}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
