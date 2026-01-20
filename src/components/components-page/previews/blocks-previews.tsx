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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const CardFormPreview = React.memo(function CardFormPreview() {
  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <div className="aspect-video w-full bg-muted/30 rounded-t-lg" />
        <CardHeader>
          <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
          <CardDescription>
            Switch to the improved way to explore your data, with natural
            language. Monitoring will no longer be available on the Pro plan
            in November, 2025.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button className="btn-glow">Create Query +</Button>
          <Button variant="outline" size="sm">
            Warning
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
});

export const FormPreview = React.memo(function FormPreview() {
  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Please fill in your details below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="program">Program</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="framework">Framework</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              placeholder="Add any additional comments"
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="btn-glow">Submit</Button>
          <Button variant="outline">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
});

export const ComplexFormPreview = React.memo(function ComplexFormPreview() {
  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            All transactions are secure and encrypted
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-name">Name on Card</Label>
            <Input id="card-name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="btn-glow w-full">Submit Payment</Button>
        </CardFooter>
      </Card>
    </div>
  );
});

export const FieldsPreview = React.memo(function FieldsPreview() {
  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Compute Environment</CardTitle>
          <CardDescription>
            Select the compute environment for your cluster.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="kubernetes" className="space-y-4">
            <div className="flex items-start space-x-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <RadioGroupItem
                value="kubernetes"
                id="k8s"
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="k8s"
                  className="font-semibold cursor-pointer"
                >
                  Kubernetes
                </Label>
                <p className="text-sm text-muted-foreground">
                  Run GPU workloads on a K8s configured cluster. This is the
                  default.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
              <RadioGroupItem value="vm" id="vm" className="mt-1" />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="vm"
                  className="font-semibold cursor-pointer"
                >
                  Virtual Machine
                </Label>
                <p className="text-sm text-muted-foreground">
                  Run workloads on a virtual machine instance.
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button className="btn-glow">Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
});

export const blocksPreviews: Record<string, React.ComponentType> = {
  "card-form": CardFormPreview,
  "form": FormPreview,
  "complex-form": ComplexFormPreview,
  "fields": FieldsPreview,
};
