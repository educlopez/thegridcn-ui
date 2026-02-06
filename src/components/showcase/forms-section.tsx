"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import { SectionWrapper, ComponentCard } from "./section-wrapper"

export function FormsSection() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  // Set initial date after hydration to avoid server/client mismatch
  React.useEffect(() => {
    setDate(new Date())
  }, [])
  const [sliderValue, setSliderValue] = React.useState([50])

  return (
    <SectionWrapper
      title="Form Controls"
      description="Input components for user data collection"
    >
      <ComponentCard title="Text Input">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@tron.grid"
              className="input-tron"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter access code"
              className="input-tron"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled</Label>
            <Input id="disabled" disabled placeholder="Offline" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="readonly">Read Only</Label>
            <Input id="readonly" readOnly value="System data" />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Textarea">
        <div className="space-y-2">
          <Label htmlFor="message">System Message</Label>
          <Textarea
            id="message"
            placeholder="Enter your transmission..."
            className="input-tron min-h-[100px]"
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Select">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Program Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="program">Program</SelectItem>
                <SelectItem value="iso">ISO</SelectItem>
                <SelectItem value="basics">Basics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Sector</Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Locked" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Sector 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Checkbox">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept Grid protocols</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter">Receive system updates</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="disabled-check" disabled />
            <Label htmlFor="disabled-check" className="text-muted-foreground">
              Administrative access (disabled)
            </Label>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Radio Group">
        <RadioGroup defaultValue="user">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user" id="r1" />
            <Label htmlFor="r1">User</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="program" id="r2" />
            <Label htmlFor="r2">Program</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="admin" id="r3" />
            <Label htmlFor="r3">Administrator</Label>
          </div>
        </RadioGroup>
      </ComponentCard>

      <ComponentCard title="Switch">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="grid-mode">Grid Mode</Label>
            <Switch id="grid-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="stealth">Stealth Protocol</Label>
            <Switch id="stealth" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="locked" className="text-muted-foreground">
              System Lock
            </Label>
            <Switch id="locked" disabled />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Slider">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Power Level</Label>
              <span className="text-sm text-muted-foreground">{sliderValue[0]}%</span>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Range Selection</Label>
            <Slider defaultValue={[25, 75]} max={100} step={1} />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Input OTP">
        <div className="space-y-4">
          <Label>Access Code</Label>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </ComponentCard>

      <ComponentCard title="Calendar">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </ComponentCard>
    </SectionWrapper>
  )
}
