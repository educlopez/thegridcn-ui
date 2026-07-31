"use client";

import {
  Activity,
  BarChart3,
  Bell,
  LayoutDashboard,
  Network,
  Server,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { ActivityFeed } from "@/components/thegridcn/activity-feed";
import { BreadcrumbNav } from "@/components/thegridcn/breadcrumb-nav";
import { DataTable } from "@/components/thegridcn/data-table";
import { Gauge } from "@/components/thegridcn/gauge";
import { Heatmap } from "@/components/thegridcn/heatmap";
import { MetricRow } from "@/components/thegridcn/metric-row";
import { ProgressBar } from "@/components/thegridcn/progress-bar";
import { SearchInput } from "@/components/thegridcn/search-input";
import { SidebarNav } from "@/components/thegridcn/sidebar-nav";
import { StatCard } from "@/components/thegridcn/stat-card";
import { StatusDot } from "@/components/thegridcn/status-dot";
import { DashboardLayout } from "@/components/thegridcn/templates/dashboard-layout";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */

const DASHBOARD_NAV_ITEMS = [
  {
    active: true,
    href: "#",
    icon: <LayoutDashboard size={16} />,
    label: "Dashboard",
  },
  { href: "#analytics", icon: <BarChart3 size={16} />, label: "Analytics" },
  { href: "#users", icon: <Users size={16} />, label: "Users" },
  { href: "#network", icon: <Network size={16} />, label: "Network" },
  { href: "#alerts", icon: <Bell size={16} />, label: "Alerts" },
  { href: "#systems", icon: <Server size={16} />, label: "Systems" },
  { href: "#settings", icon: <Settings size={16} />, label: "Settings" },
];

const DASHBOARD_BREADCRUMBS = [
  { href: "#", label: "Home" },
  { active: true, label: "Dashboard" },
];

const DASHBOARD_METRICS = [
  {
    change: "+14.2%",
    changeType: "up" as const,
    icon: <Users size={16} />,
    label: "Active Users",
    value: "12,847",
  },
  {
    change: "+8.7%",
    changeType: "up" as const,
    icon: <BarChart3 size={16} />,
    label: "Revenue",
    value: "$284.5K",
  },
  {
    change: "+2.1%",
    changeType: "up" as const,
    icon: <Activity size={16} />,
    label: "System Load",
    value: "67.3%",
  },
  {
    change: "-23.5%",
    changeType: "down" as const,
    icon: <Bell size={16} />,
    label: "Error Rate",
    value: "0.12%",
  },
];

const DASHBOARD_STAT_CARDS = [
  {
    sparkline: [20, 25, 22, 30, 28, 35, 40, 38, 45, 48, 52, 55],
    title: "Total Connections",
    trend: "up" as const,
    trendValue: "+12.4%",
    unit: "nodes",
    value: 48_291,
  },
  {
    sparkline: [40, 42, 38, 44, 46, 50, 48, 52, 55, 58, 60, 62],
    title: "Data Throughput",
    trend: "up" as const,
    trendValue: "+5.8%",
    unit: "GB/s",
    value: 7842,
  },
  {
    sparkline: [22, 20, 18, 19, 17, 16, 15, 14, 13, 12, 13, 12],
    title: "Latency",
    trend: "down" as const,
    trendValue: "-8.3%",
    unit: "ms",
    value: 12,
  },
  {
    sparkline: [99, 99, 100, 99, 100, 100, 99, 100, 100, 100, 99, 100],
    title: "Uptime",
    trend: "neutral" as const,
    trendValue: "Stable",
    unit: "%",
    value: "99.97",
  },
];

const DASHBOARD_CHART_DATA = [
  { month: "Jan", revenue: 18_400, users: 4200 },
  { month: "Feb", revenue: 21_200, users: 4800 },
  { month: "Mar", revenue: 23_800, users: 5100 },
  { month: "Apr", revenue: 22_100, users: 4900 },
  { month: "May", revenue: 27_500, users: 5600 },
  { month: "Jun", revenue: 31_000, users: 6200 },
  { month: "Jul", revenue: 34_200, users: 6800 },
  { month: "Aug", revenue: 38_100, users: 7400 },
  { month: "Sep", revenue: 36_800, users: 7100 },
  { month: "Oct", revenue: 42_500, users: 8200 },
  { month: "Nov", revenue: 47_200, users: 9100 },
  { month: "Dec", revenue: 51_800, users: 9800 },
];

const AREA_CHART_CONFIG: ChartConfig = {
  revenue: { color: "var(--chart-1)", label: "Revenue ($)" },
};

const BAR_CHART_CONFIG: ChartConfig = {
  users: { color: "var(--chart-2)", label: "Active Users" },
};

// biome-ignore lint/style/useConsistentTypeDefinitions: a type alias keeps the implicit index signature DataTable needs
type TableRow = {
  cpu: number;
  id: string;
  lastPing: string;
  memory: number;
  node: string;
  region: string;
  status: string;
  uptime: string;
};

const DASHBOARD_TABLE_COLUMNS = [
  { key: "node" as const, label: "Node", sortable: true },
  {
    key: "status" as const,
    label: "Status",
    render: (value: unknown) => {
      const v = value as string;
      const variant =
        v === "Online"
          ? "success"
          : v === "Warning"
            ? "warning"
            : v === "Degraded"
              ? "warning"
              : "danger";
      return (
        <span className="inline-flex items-center gap-1.5">
          <StatusDot
            status={
              variant === "success"
                ? "online"
                : variant === "warning"
                  ? "busy"
                  : "error"
            }
            size="sm"
          />
          <span className="font-mono text-xs">{v}</span>
        </span>
      );
    },
    sortable: true,
  },
  {
    align: "right" as const,
    key: "cpu" as const,
    label: "CPU %",
    render: (value: unknown) => {
      const v = value as number;
      return (
        <span
          className={`font-mono text-xs ${v > 80 ? "text-red-400" : v > 60 ? "text-amber-400" : "text-green-400"}`}
        >
          {v}%
        </span>
      );
    },
    sortable: true,
  },
  {
    align: "right" as const,
    key: "memory" as const,
    label: "Memory %",
    render: (value: unknown) => {
      const v = value as number;
      return (
        <span
          className={`font-mono text-xs ${v > 80 ? "text-red-400" : v > 60 ? "text-amber-400" : "text-green-400"}`}
        >
          {v}%
        </span>
      );
    },
    sortable: true,
  },
  { key: "region" as const, label: "Region", sortable: true },
  {
    align: "right" as const,
    key: "uptime" as const,
    label: "Uptime",
    sortable: true,
  },
  {
    align: "right" as const,
    key: "lastPing" as const,
    label: "Last Ping",
    sortable: false,
  },
];

const DASHBOARD_TABLE_DATA: TableRow[] = [
  {
    cpu: 42,
    id: "n-001",
    lastPing: "2ms",
    memory: 58,
    node: "GRID-ALPHA-01",
    region: "US-East",
    status: "Online",
    uptime: "47d 12h",
  },
  {
    cpu: 67,
    id: "n-002",
    lastPing: "3ms",
    memory: 72,
    node: "GRID-ALPHA-02",
    region: "US-East",
    status: "Online",
    uptime: "47d 12h",
  },
  {
    cpu: 89,
    id: "n-003",
    lastPing: "45ms",
    memory: 85,
    node: "GRID-BETA-01",
    region: "EU-West",
    status: "Warning",
    uptime: "12d 6h",
  },
  {
    cpu: 35,
    id: "n-004",
    lastPing: "42ms",
    memory: 41,
    node: "GRID-BETA-02",
    region: "EU-West",
    status: "Online",
    uptime: "33d 1h",
  },
  {
    cpu: 51,
    id: "n-005",
    lastPing: "128ms",
    memory: 63,
    node: "GRID-GAMMA-01",
    region: "AP-South",
    status: "Online",
    uptime: "89d 4h",
  },
  {
    cpu: 78,
    id: "n-006",
    lastPing: "156ms",
    memory: 91,
    node: "GRID-GAMMA-02",
    region: "AP-South",
    status: "Degraded",
    uptime: "5d 18h",
  },
  {
    cpu: 28,
    id: "n-007",
    lastPing: "8ms",
    memory: 34,
    node: "GRID-DELTA-01",
    region: "US-West",
    status: "Online",
    uptime: "102d 9h",
  },
  {
    cpu: 44,
    id: "n-008",
    lastPing: "7ms",
    memory: 52,
    node: "GRID-DELTA-02",
    region: "US-West",
    status: "Online",
    uptime: "102d 9h",
  },
  {
    cpu: 0,
    id: "n-009",
    lastPing: "—",
    memory: 0,
    node: "GRID-EPSILON-01",
    region: "SA-East",
    status: "Offline",
    uptime: "0d 0h",
  },
  {
    cpu: 56,
    id: "n-010",
    lastPing: "38ms",
    memory: 48,
    node: "GRID-ZETA-01",
    region: "EU-North",
    status: "Online",
    uptime: "67d 22h",
  },
];

const DASHBOARD_ACTIVITIES = [
  {
    description: "CPU usage reached 89%, auto-scaling initiated",
    id: "a-1",
    timestamp: "2 min ago",
    title: "Node GRID-BETA-01 CPU threshold exceeded",
    type: "warning" as const,
  },
  {
    description: "All 8 nodes updated to latest firmware",
    id: "a-2",
    timestamp: "14 min ago",
    title: "Deployment v4.2.1 completed successfully",
    type: "success" as const,
  },
  {
    description: "Connection lost — automatic failover engaged",
    id: "a-3",
    timestamp: "28 min ago",
    title: "Node GRID-EPSILON-01 went offline",
    type: "error" as const,
  },
  {
    description: "No vulnerabilities detected across 10 nodes",
    id: "a-4",
    timestamp: "1 hour ago",
    title: "Security scan completed",
    type: "info" as const,
  },
  {
    description: "Incremental backup: 2.4TB synced to cold storage",
    id: "a-5",
    timestamp: "2 hours ago",
    title: "Backup cycle completed",
    type: "success" as const,
  },
  {
    description: "User operator-7G granted Level-3 access",
    id: "a-6",
    timestamp: "3 hours ago",
    title: "New user provisioned",
    type: "info" as const,
  },
  {
    description: "GRID-GAMMA-02 memory reclaimed: 12GB freed",
    id: "a-7",
    timestamp: "4 hours ago",
    title: "Memory optimization applied",
    type: "success" as const,
  },
];

const DASHBOARD_HEATMAP_DATA = [
  [2, 5, 8, 12, 15, 18, 14, 10, 7, 4, 3, 2],
  [3, 6, 10, 14, 20, 25, 22, 16, 11, 8, 5, 3],
  [1, 4, 7, 11, 16, 21, 19, 14, 9, 6, 4, 2],
  [4, 8, 12, 18, 24, 30, 28, 20, 15, 10, 6, 3],
  [2, 5, 9, 13, 17, 22, 20, 15, 10, 7, 4, 2],
  [3, 7, 11, 16, 22, 28, 25, 18, 13, 9, 5, 3],
  [1, 3, 6, 9, 12, 15, 13, 10, 7, 5, 3, 1],
];

const HEATMAP_ROW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_COL_LABELS = [
  "00",
  "02",
  "04",
  "06",
  "08",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
];

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export function DashboardTemplate() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <DashboardLayout
      sidebar={
        <>
          {/* Desktop sidebar */}
          <div className="hidden h-full md:block">
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
                    <span className="font-[family-name:var(--font-orbitron)] font-semibold text-[11px] text-primary uppercase tracking-wider">
                      Gridcn
                    </span>
                  )}
                </div>
              }
            />
          </div>

          {/* Mobile sidebar overlay */}
          {mobileMenuOpen ? (
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
          ) : null}
        </>
      }
      header={
        <div>
          <UplinkHeader
            leftText="GRID CONTROL v4.2"
            rightText="SECTOR 7-G // ONLINE"
          />
          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 border-primary/10 border-b px-4 py-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded border border-primary/30 p-1.5 text-primary/60 transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Open menu"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2 4h12M2 8h12M2 12h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <span className="font-mono text-[10px] text-primary/60 uppercase tracking-widest">
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
            <h3 className="mb-4 font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Revenue Trend
            </h3>
            <ChartContainer
              config={AREA_CHART_CONFIG}
              className="h-[250px] w-full"
            >
              <AreaChart
                data={DASHBOARD_CHART_DATA}
                margin={{ bottom: 0, left: 0, right: 10, top: 5 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="month"
                  tick={{
                    fill: "var(--foreground)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    opacity: 0.5,
                  }}
                  axisLine={{ stroke: "var(--border)", strokeOpacity: 0.3 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{
                    fill: "var(--foreground)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    opacity: 0.5,
                  }}
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
            <h3 className="mb-4 font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Active Users by Month
            </h3>
            <ChartContainer
              config={BAR_CHART_CONFIG}
              className="h-[250px] w-full"
            >
              <BarChart
                data={DASHBOARD_CHART_DATA}
                margin={{ bottom: 0, left: 0, right: 10, top: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="month"
                  tick={{
                    fill: "var(--foreground)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    opacity: 0.5,
                  }}
                  axisLine={{ stroke: "var(--border)", strokeOpacity: 0.3 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{
                    fill: "var(--foreground)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    opacity: 0.5,
                  }}
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
            <div className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Resource Usage
            </div>
            <div className="space-y-3">
              <ProgressBar
                value={67}
                label="CPU"
                showValue
                size="md"
                animated
              />
              <ProgressBar
                value={72}
                label="Memory"
                showValue
                size="md"
                variant="warning"
                animated
              />
              <ProgressBar
                value={45}
                label="Disk"
                showValue
                size="md"
                variant="success"
                animated
              />
              <ProgressBar
                value={89}
                label="Network"
                showValue
                size="md"
                variant="danger"
                animated
              />
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
  );
}
