"use client"

import * as React from "react"
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Network,
  Bell,
  Server,
  Activity,
  Zap,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { DashboardLayout } from "@/components/thegridcn/templates/dashboard-layout"
import { SidebarNav } from "@/components/thegridcn/sidebar-nav"
import { UplinkHeader } from "@/components/thegridcn/uplink-header"
import { BreadcrumbNav } from "@/components/thegridcn/breadcrumb-nav"
import { SearchInput } from "@/components/thegridcn/search-input"
import { MetricRow } from "@/components/thegridcn/metric-row"
import { StatCard } from "@/components/thegridcn/stat-card"
import { DataTable } from "@/components/thegridcn/data-table"
import { ActivityFeed } from "@/components/thegridcn/activity-feed"
import { Gauge } from "@/components/thegridcn/gauge"
import { ProgressBar } from "@/components/thegridcn/progress-bar"
import { Heatmap } from "@/components/thegridcn/heatmap"
import { StatusDot } from "@/components/thegridcn/status-dot"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */

const DASHBOARD_NAV_ITEMS = [
  { label: "Dashboard", href: "#", icon: <LayoutDashboard size={16} />, active: true },
  { label: "Analytics", href: "#analytics", icon: <BarChart3 size={16} /> },
  { label: "Users", href: "#users", icon: <Users size={16} /> },
  { label: "Network", href: "#network", icon: <Network size={16} /> },
  { label: "Alerts", href: "#alerts", icon: <Bell size={16} /> },
  { label: "Systems", href: "#systems", icon: <Server size={16} /> },
  { label: "Settings", href: "#settings", icon: <Settings size={16} /> },
]

const DASHBOARD_BREADCRUMBS = [
  { label: "Home", href: "#" },
  { label: "Dashboard", active: true },
]

const DASHBOARD_METRICS = [
  { label: "Active Users", value: "12,847", change: "+14.2%", changeType: "up" as const, icon: <Users size={16} /> },
  { label: "Revenue", value: "$284.5K", change: "+8.7%", changeType: "up" as const, icon: <BarChart3 size={16} /> },
  { label: "System Load", value: "67.3%", change: "+2.1%", changeType: "up" as const, icon: <Activity size={16} /> },
  { label: "Error Rate", value: "0.12%", change: "-23.5%", changeType: "down" as const, icon: <Bell size={16} /> },
]

const DASHBOARD_STAT_CARDS = [
  {
    title: "Total Connections",
    value: 48291,
    unit: "nodes",
    trend: "up" as const,
    trendValue: "+12.4%",
    sparkline: [20, 25, 22, 30, 28, 35, 40, 38, 45, 48, 52, 55],
  },
  {
    title: "Data Throughput",
    value: 7842,
    unit: "GB/s",
    trend: "up" as const,
    trendValue: "+5.8%",
    sparkline: [40, 42, 38, 44, 46, 50, 48, 52, 55, 58, 60, 62],
  },
  {
    title: "Latency",
    value: 12,
    unit: "ms",
    trend: "down" as const,
    trendValue: "-8.3%",
    sparkline: [22, 20, 18, 19, 17, 16, 15, 14, 13, 12, 13, 12],
  },
  {
    title: "Uptime",
    value: "99.97",
    trend: "neutral" as const,
    trendValue: "Stable",
    unit: "%",
    sparkline: [99, 99, 100, 99, 100, 100, 99, 100, 100, 100, 99, 100],
  },
]

const DASHBOARD_CHART_DATA = [
  { month: "Jan", users: 4200, revenue: 18400 },
  { month: "Feb", users: 4800, revenue: 21200 },
  { month: "Mar", users: 5100, revenue: 23800 },
  { month: "Apr", users: 4900, revenue: 22100 },
  { month: "May", users: 5600, revenue: 27500 },
  { month: "Jun", users: 6200, revenue: 31000 },
  { month: "Jul", users: 6800, revenue: 34200 },
  { month: "Aug", users: 7400, revenue: 38100 },
  { month: "Sep", users: 7100, revenue: 36800 },
  { month: "Oct", users: 8200, revenue: 42500 },
  { month: "Nov", users: 9100, revenue: 47200 },
  { month: "Dec", users: 9800, revenue: 51800 },
]

const AREA_CHART_CONFIG: ChartConfig = {
  revenue: { label: "Revenue ($)", color: "var(--chart-1)" },
}

const BAR_CHART_CONFIG: ChartConfig = {
  users: { label: "Active Users", color: "var(--chart-2)" },
}

type TableRow = {
  id: string
  node: string
  status: string
  cpu: number
  memory: number
  region: string
  uptime: string
  lastPing: string
}

const DASHBOARD_TABLE_COLUMNS = [
  { key: "node" as const, label: "Node", sortable: true },
  {
    key: "status" as const,
    label: "Status",
    sortable: true,
    render: (value: unknown) => {
      const v = value as string
      const variant = v === "Online" ? "success" : v === "Warning" ? "warning" : v === "Degraded" ? "warning" : "danger"
      return (
        <span className="inline-flex items-center gap-1.5">
          <StatusDot status={variant === "success" ? "online" : variant === "warning" ? "busy" : "error"} size="sm" />
          <span className="font-mono text-xs">{v}</span>
        </span>
      )
    },
  },
  {
    key: "cpu" as const,
    label: "CPU %",
    sortable: true,
    align: "right" as const,
    render: (value: unknown) => {
      const v = value as number
      return (
        <span className={`font-mono text-xs ${v > 80 ? "text-red-400" : v > 60 ? "text-amber-400" : "text-green-400"}`}>
          {v}%
        </span>
      )
    },
  },
  {
    key: "memory" as const,
    label: "Memory %",
    sortable: true,
    align: "right" as const,
    render: (value: unknown) => {
      const v = value as number
      return (
        <span className={`font-mono text-xs ${v > 80 ? "text-red-400" : v > 60 ? "text-amber-400" : "text-green-400"}`}>
          {v}%
        </span>
      )
    },
  },
  { key: "region" as const, label: "Region", sortable: true },
  { key: "uptime" as const, label: "Uptime", sortable: true, align: "right" as const },
  { key: "lastPing" as const, label: "Last Ping", sortable: false, align: "right" as const },
]

const DASHBOARD_TABLE_DATA: TableRow[] = [
  { id: "n-001", node: "GRID-ALPHA-01", status: "Online", cpu: 42, memory: 58, region: "US-East", uptime: "47d 12h", lastPing: "2ms" },
  { id: "n-002", node: "GRID-ALPHA-02", status: "Online", cpu: 67, memory: 72, region: "US-East", uptime: "47d 12h", lastPing: "3ms" },
  { id: "n-003", node: "GRID-BETA-01", status: "Warning", cpu: 89, memory: 85, region: "EU-West", uptime: "12d 6h", lastPing: "45ms" },
  { id: "n-004", node: "GRID-BETA-02", status: "Online", cpu: 35, memory: 41, region: "EU-West", uptime: "33d 1h", lastPing: "42ms" },
  { id: "n-005", node: "GRID-GAMMA-01", status: "Online", cpu: 51, memory: 63, region: "AP-South", uptime: "89d 4h", lastPing: "128ms" },
  { id: "n-006", node: "GRID-GAMMA-02", status: "Degraded", cpu: 78, memory: 91, region: "AP-South", uptime: "5d 18h", lastPing: "156ms" },
  { id: "n-007", node: "GRID-DELTA-01", status: "Online", cpu: 28, memory: 34, region: "US-West", uptime: "102d 9h", lastPing: "8ms" },
  { id: "n-008", node: "GRID-DELTA-02", status: "Online", cpu: 44, memory: 52, region: "US-West", uptime: "102d 9h", lastPing: "7ms" },
  { id: "n-009", node: "GRID-EPSILON-01", status: "Offline", cpu: 0, memory: 0, region: "SA-East", uptime: "0d 0h", lastPing: "—" },
  { id: "n-010", node: "GRID-ZETA-01", status: "Online", cpu: 56, memory: 48, region: "EU-North", uptime: "67d 22h", lastPing: "38ms" },
]

const DASHBOARD_ACTIVITIES = [
  { id: "a-1", title: "Node GRID-BETA-01 CPU threshold exceeded", description: "CPU usage reached 89%, auto-scaling initiated", timestamp: "2 min ago", type: "warning" as const },
  { id: "a-2", title: "Deployment v4.2.1 completed successfully", description: "All 8 nodes updated to latest firmware", timestamp: "14 min ago", type: "success" as const },
  { id: "a-3", title: "Node GRID-EPSILON-01 went offline", description: "Connection lost — automatic failover engaged", timestamp: "28 min ago", type: "error" as const },
  { id: "a-4", title: "Security scan completed", description: "No vulnerabilities detected across 10 nodes", timestamp: "1 hour ago", type: "info" as const },
  { id: "a-5", title: "Backup cycle completed", description: "Incremental backup: 2.4TB synced to cold storage", timestamp: "2 hours ago", type: "success" as const },
  { id: "a-6", title: "New user provisioned", description: "User operator-7G granted Level-3 access", timestamp: "3 hours ago", type: "info" as const },
  { id: "a-7", title: "Memory optimization applied", description: "GRID-GAMMA-02 memory reclaimed: 12GB freed", timestamp: "4 hours ago", type: "success" as const },
]

const DASHBOARD_HEATMAP_DATA = [
  [2, 5, 8, 12, 15, 18, 14, 10, 7, 4, 3, 2],
  [3, 6, 10, 14, 20, 25, 22, 16, 11, 8, 5, 3],
  [1, 4, 7, 11, 16, 21, 19, 14, 9, 6, 4, 2],
  [4, 8, 12, 18, 24, 30, 28, 20, 15, 10, 6, 3],
  [2, 5, 9, 13, 17, 22, 20, 15, 10, 7, 4, 2],
  [3, 7, 11, 16, 22, 28, 25, 18, 13, 9, 5, 3],
  [1, 3, 6, 9, 12, 15, 13, 10, 7, 5, 3, 1],
]

const HEATMAP_ROW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HEATMAP_COL_LABELS = ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"]

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export function DashboardTemplate() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <DashboardLayout
      sidebar={
        <>
          {/* Desktop sidebar */}
          <div className="hidden md:block h-full">
            <SidebarNav
              items={DASHBOARD_NAV_ITEMS}
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed((c) => !c)}
              logo={
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-primary/40 bg-primary/10">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  {!sidebarCollapsed && (
                    <span className="font-[family-name:var(--font-orbitron)] text-[11px] font-semibold uppercase tracking-wider text-primary">
                      Gridcn
                    </span>
                  )}
                </div>
              }
            />
          </div>

          {/* Mobile sidebar overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="relative z-10 h-full w-60">
                <SidebarNav
                  items={DASHBOARD_NAV_ITEMS}
                  collapsed={false}
                  onToggle={() => setMobileMenuOpen(false)}
                />
              </div>
            </div>
          )}
        </>
      }
      header={
        <div>
          <UplinkHeader
            leftText="GRID CONTROL v4.2"
            rightText="SECTOR 7-G // ONLINE"
          />
          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 border-b border-primary/10 px-4 py-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded border border-primary/30 p-1.5 text-primary/60 transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Open menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
              Grid Control
            </span>
          </div>
        </div>
      }
    >
      {/* ── Content Area ── */}
      <div className="space-y-6">

        {/* Breadcrumbs + Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <BreadcrumbNav items={DASHBOARD_BREADCRUMBS} />
          <div className="w-full sm:w-64">
            <SearchInput placeholder="Search nodes, metrics..." />
          </div>
        </div>

        {/* ── Metrics Row ── */}
        <MetricRow metrics={DASHBOARD_METRICS} columns={4} />

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_STAT_CARDS.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* ── Charts Section ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Area Chart — Revenue */}
          <div className="rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Revenue Trend
            </h3>
            <ChartContainer config={AREA_CHART_CONFIG} className="h-[250px] w-full">
              <AreaChart data={DASHBOARD_CHART_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--foreground)", opacity: 0.5, fontSize: 10, fontFamily: "monospace" }}
                  axisLine={{ stroke: "var(--border)", strokeOpacity: 0.3 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--foreground)", opacity: 0.5, fontSize: 10, fontFamily: "monospace" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Bar Chart — Users */}
          <div className="rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Active Users by Month
            </h3>
            <ChartContainer config={BAR_CHART_CONFIG} className="h-[250px] w-full">
              <BarChart data={DASHBOARD_CHART_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--foreground)", opacity: 0.5, fontSize: 10, fontFamily: "monospace" }}
                  axisLine={{ stroke: "var(--border)", strokeOpacity: 0.3 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--foreground)", opacity: 0.5, fontSize: 10, fontFamily: "monospace" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="users"
                  fill="var(--color-users)"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        {/* ── Bottom Section: DataTable + ActivityFeed ── */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* DataTable — spans 2 cols */}
          <div className="xl:col-span-2">
            <DataTable
              columns={DASHBOARD_TABLE_COLUMNS}
              data={DASHBOARD_TABLE_DATA}
              label="Grid Nodes"
              striped
            />
          </div>

          {/* Activity Feed */}
          <div>
            <ActivityFeed
              items={DASHBOARD_ACTIVITIES}
              label="Recent Activity"
              maxItems={6}
            />
          </div>
        </div>

        {/* ── Secondary Widgets Row ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Gauge — System Load */}
          <div className="flex items-center justify-center rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <Gauge
              value={67.3}
              min={0}
              max={100}
              label="System Load"
              unit="%"
              size="md"
            />
          </div>

          {/* Progress Bars */}
          <div className="space-y-4 rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Resource Usage
            </div>
            <div className="space-y-3">
              <ProgressBar value={67} label="CPU" showValue size="md" animated />
              <ProgressBar value={72} label="Memory" showValue size="md" variant="warning" animated />
              <ProgressBar value={45} label="Disk" showValue size="md" variant="success" animated />
              <ProgressBar value={89} label="Network" showValue size="md" variant="danger" animated />
            </div>
          </div>

          {/* Gauge — Error Rate */}
          <div className="flex items-center justify-center rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <Gauge
              value={0.12}
              min={0}
              max={1}
              label="Error Rate"
              unit="%"
              size="md"
              variant="success"
            />
          </div>

          {/* Gauge — Memory */}
          <div className="flex items-center justify-center rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <Gauge
              value={72}
              min={0}
              max={100}
              label="Memory"
              unit="%"
              size="md"
            />
          </div>
        </div>

        {/* ── Heatmap — Traffic by Hour ── */}
        <Heatmap
          data={DASHBOARD_HEATMAP_DATA}
          rowLabels={HEATMAP_ROW_LABELS}
          columnLabels={HEATMAP_COL_LABELS}
          label="Network Traffic (requests/sec)"
        />

      </div>
    </DashboardLayout>
  )
}
