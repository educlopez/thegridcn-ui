"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const CardPreview = React.memo(function CardPreview() {
  return (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content with some information.</p>
        </CardContent>
        <CardFooter>
          <Button className="btn-glow">Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
});

export const BadgePreview = React.memo(function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
});

export const ProgressPreview = React.memo(function ProgressPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <Progress value={33} />
      <Progress value={66} />
      <Progress value={100} />
    </div>
  );
});

export const TabsPreview = React.memo(function TabsPreview() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password.</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
});

export const AccordionPreview = React.memo(function AccordionPreview() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is the Grid?</AccordionTrigger>
        <AccordionContent>
          The Grid is a digital frontier created by Kevin Flynn.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What are ISOs?</AccordionTrigger>
        <AccordionContent>
          ISOs are a unique form of digital life that emerged on the Grid.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});

export const dataDisplayPreviews: Record<string, React.ComponentType> = {
  "card": CardPreview,
  "badge": BadgePreview,
  "progress": ProgressPreview,
  "tabs": TabsPreview,
  "accordion": AccordionPreview,
};
