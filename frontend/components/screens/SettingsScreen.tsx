import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { AppSettings } from "@/types"

interface SettingsScreenProps {
  settings: AppSettings
  onUpdateSettings: (settings: AppSettings) => void
}

export default function SettingsScreen({ settings, onUpdateSettings }: SettingsScreenProps) {
  return (
    <div className="py-6 space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">Alarm Settings</h3>

        <div className="space-y-2">
          <Label>Volume: {settings.volume}%</Label>
          <Slider
            value={[settings.volume]}
            onValueChange={([value]) => onUpdateSettings({ ...settings, volume: value })}
            max={100}
            step={10}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alarm-tone">Alarm Tone</Label>
          <Select
            value={settings.alarmTone}
            onValueChange={(value) => onUpdateSettings({ ...settings, alarmTone: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              <SelectItem value="Gentle">Gentle</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
              <SelectItem value="Chime">Chime</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">App Settings</h3>

        <div className="flex items-center justify-between">
          <div>
            <Label>Dark Mode</Label>
            <p className="text-sm text-muted-foreground">Use dark theme</p>
          </div>
          <Switch
            checked={settings.darkMode}
            onCheckedChange={(checked) => onUpdateSettings({ ...settings, darkMode: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Offline Mode</Label>
            <p className="text-sm text-muted-foreground">Work without internet</p>
          </div>
          <Switch
            checked={settings.offlineMode}
            onCheckedChange={(checked) => onUpdateSettings({ ...settings, offlineMode: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Battery Optimization</Label>
            <p className="text-sm text-muted-foreground">Optimize for battery life</p>
          </div>
          <Switch
            checked={settings.batteryOptimization}
            onCheckedChange={(checked) => onUpdateSettings({ ...settings, batteryOptimization: checked })}
          />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-2">About</h3>
        <p className="text-sm text-muted-foreground mb-2">MedReminder v1.0.0</p>
        <p className="text-sm text-muted-foreground">A simple, reliable medication reminder app that works offline.</p>
      </Card>
    </div>
  )
}
