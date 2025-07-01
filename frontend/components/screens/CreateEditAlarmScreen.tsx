"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { Alarm } from "@/types"

interface CreateEditAlarmScreenProps {
  alarm: Alarm | null
  onSave: (alarm: Partial<Alarm>) => void
  onCancel: () => void
}

export default function CreateEditAlarmScreen({ alarm, onSave, onCancel }: CreateEditAlarmScreenProps) {
  const [formData, setFormData] = useState({
    medicationName: alarm?.medicationName || "",
    dose: alarm?.dose || "",
    time: alarm?.time || "08:00",
    repeatPattern: alarm?.repeatPattern || "Daily",
    customHours: alarm?.customHours || 6,
    soundEnabled: alarm?.soundEnabled ?? true,
    sleepHoursEnabled: alarm?.sleepHoursEnabled ?? false,
    sleepStartTime: alarm?.sleepStartTime || "22:00",
    sleepEndTime: alarm?.sleepEndTime || "07:00",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.medicationName.trim()) {
      onSave(formData)
    }
  }

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">{alarm ? "Edit Medication" : "Add New Medication"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="medication-name">Medication Name *</Label>
          <Input
            id="medication-name"
            value={formData.medicationName}
            onChange={(e) => setFormData((prev) => ({ ...prev, medicationName: e.target.value }))}
            placeholder="e.g., Lisinopril"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dose">Dose (optional)</Label>
          <Input
            id="dose"
            value={formData.dose}
            onChange={(e) => setFormData((prev) => ({ ...prev, dose: e.target.value }))}
            placeholder="e.g., 10mg, 2 tablets"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repeat">Repeat Pattern</Label>
            <Select
              value={formData.repeatPattern}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, repeatPattern: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Every 6h">Every 6 hours</SelectItem>
                <SelectItem value="Every 8h">Every 8 hours</SelectItem>
                <SelectItem value="Every 12h">Every 12 hours</SelectItem>
                <SelectItem value="Custom">Custom hours</SelectItem>
                <SelectItem value="Weekdays">Weekdays only</SelectItem>
                <SelectItem value="Weekends">Weekends only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.repeatPattern === "Custom" && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <Label>
                  Every {formData.customHours} hour{formData.customHours !== 1 ? "s" : ""}
                </Label>
                <Badge variant="outline">{formData.customHours}h</Badge>
              </div>
              <Slider
                value={[formData.customHours]}
                onValueChange={([value]) => setFormData((prev) => ({ ...prev, customHours: value }))}
                min={1}
                max={24}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 hour</span>
                <span>24 hours</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound">Enable Sound</Label>
            <Switch
              id="sound"
              checked={formData.soundEnabled}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, soundEnabled: checked }))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sleep-hours">Silent During Sleep Hours</Label>
                <p className="text-sm text-muted-foreground">Disable alarms during specified hours</p>
              </div>
              <Switch
                id="sleep-hours"
                checked={formData.sleepHoursEnabled}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, sleepHoursEnabled: checked }))}
              />
            </div>

            {formData.sleepHoursEnabled && (
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sleep-start">Sleep Start</Label>
                    <Input
                      id="sleep-start"
                      type="time"
                      value={formData.sleepStartTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sleepStartTime: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sleep-end">Sleep End</Label>
                    <Input
                      id="sleep-end"
                      type="time"
                      value={formData.sleepEndTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sleepEndTime: e.target.value }))}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Alarms will be silenced from {formData.sleepStartTime} to {formData.sleepEndTime}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {alarm ? "Update" : "Save"} Medication
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
