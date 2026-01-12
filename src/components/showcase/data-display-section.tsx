"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { SectionWrapper, ComponentCard } from "./section-wrapper"

const programs = [
  { id: "PRG-001", name: "Tron", type: "Security", status: "Active", cycles: 2847 },
  { id: "PRG-002", name: "Clu", type: "Admin", status: "Derezzed", cycles: 1000 },
  { id: "PRG-003", name: "Quorra", type: "ISO", status: "Active", cycles: 512 },
  { id: "PRG-004", name: "Rinzler", type: "Combat", status: "Repurposed", cycles: 1523 },
]

export function DataDisplaySection() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SectionWrapper
      title="Data Display"
      description="Components for presenting information"
    >
      <ComponentCard title="Cards">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-tron">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Grid diagnostics report</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">Online</p>
              <p className="text-sm text-muted-foreground">All systems operational</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>

          <Card className="card-tron">
            <CardHeader>
              <CardTitle>Programs Active</CardTitle>
              <CardDescription>Currently running</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">2,847</p>
            </CardContent>
          </Card>

          <Card className="card-tron">
            <CardHeader>
              <CardTitle>Energy Level</CardTitle>
              <CardDescription>System power status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">{progress}% capacity</p>
            </CardContent>
          </Card>
        </div>
      </ComponentCard>

      <ComponentCard title="Avatar">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary glow-sm">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback className="bg-primary/20 text-primary">TR</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarFallback className="bg-primary/20 text-primary">CL</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarFallback className="bg-primary/20 text-primary">QR</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 border-2 border-primary">
            <AvatarFallback className="bg-primary/20 text-primary">RZ</AvatarFallback>
          </Avatar>

          {/* Stacked avatars */}
          <div className="flex -space-x-4">
            <Avatar className="border-2 border-background">
              <AvatarFallback className="bg-primary/20 text-primary">A</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback className="bg-primary/20 text-primary">B</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback className="bg-primary/20 text-primary">C</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback className="bg-muted text-muted-foreground">+3</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge className="bg-primary/20 text-primary glow-sm">Glow</Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="bg-green-500/20 text-green-400">Online</Badge>
          <Badge className="bg-yellow-500/20 text-yellow-400">Standby</Badge>
          <Badge className="bg-red-500/20 text-red-400">Offline</Badge>
          <Badge className="bg-blue-500/20 text-blue-400">Processing</Badge>
        </div>
      </ComponentCard>

      <ComponentCard title="Progress">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Download</span>
              <span>66%</span>
            </div>
            <Progress value={66} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Upload</span>
              <span>33%</span>
            </div>
            <Progress value={33} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Complete</span>
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Table">
        <div className="rounded-md border">
          <Table>
            <TableCaption>Active programs in the Grid</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Cycles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-mono text-xs">{program.id}</TableCell>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        program.status === "Active"
                          ? "border-green-500 text-green-400"
                          : program.status === "Derezzed"
                          ? "border-red-500 text-red-400"
                          : "border-yellow-500 text-yellow-400"
                      }
                    >
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{program.cycles}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ComponentCard>

      <ComponentCard title="Skeleton">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </ComponentCard>
    </SectionWrapper>
  )
}
