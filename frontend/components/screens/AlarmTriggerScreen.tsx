"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Alarm } from "@/types"

interface AlarmTriggerScreenProps {
  alarm: Alarm
  onResponse: (action: "take" | "snooze" | "skip") => void
}

export default function AlarmTriggerScreen({ alarm, onResponse }: AlarmTriggerScreenProps) {
  const [note, setNote] = useState("")

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md mx-4 rounded-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Bell className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Time for your medication!</DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{alarm.medicationName}</h3>
            {alarm.dose && <p className="text-lg text-muted-foreground">{alarm.dose}</p>}
            <p className="text-sm text-muted-foreground mt-1">Scheduled for {alarm.time}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Add a note (optional)</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How are you feeling? Any side effects?"
              className="resize-none"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 pt-4">
            <Button
              onClick={() => onResponse("take")}
              className="bg-green-600 hover:bg-green-700 text-white py-3"
              size="lg"
            >
              ✓ Take Now
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => onResponse("snooze")} variant="outline" size="lg">
                Snooze 10min
              </Button>
              <Button
                onClick={() => onResponse("skip")}
                variant="outline"
                size="lg"
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                Skip
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
