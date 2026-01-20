"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export const InputPreview = React.memo(function InputPreview() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Email address" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password" />
      </div>
    </div>
  );
});

export const TextareaPreview = React.memo(function TextareaPreview() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="comments">Comments</Label>
        <Textarea id="comments" placeholder="Add any additional comments" />
      </div>
    </div>
  );
});

export const SelectPreview = React.memo(function SelectPreview() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="guest">Guest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
});

export const RadioGroupPreview = React.memo(function RadioGroupPreview() {
  return (
    <div className="space-y-4 max-w-md">
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>
    </div>
  );
});

export const SliderPreview = React.memo(function SliderPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
});

export const CheckboxPreview = React.memo(function CheckboxPreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm">
          Accept terms and conditions
        </label>
      </div>
    </div>
  );
});

export const SwitchPreview = React.memo(function SwitchPreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <label htmlFor="airplane-mode" className="text-sm">
          Airplane mode
        </label>
      </div>
    </div>
  );
});

export const formPreviews: Record<string, React.ComponentType> = {
  "input": InputPreview,
  "textarea": TextareaPreview,
  "select": SelectPreview,
  "radio-group": RadioGroupPreview,
  "slider": SliderPreview,
  "checkbox": CheckboxPreview,
  "switch": SwitchPreview,
};
