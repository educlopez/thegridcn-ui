"use client"

import * as React from "react"
import {
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { UplinkHeader } from "@/components/thegridcn/uplink-header"
import { SearchInput } from "@/components/thegridcn/search-input"
import { StatCard } from "@/components/thegridcn/stat-card"
import { DataTable } from "@/components/thegridcn/data-table"
import { Heatmap } from "@/components/thegridcn/heatmap"
import { ProgressBar } from "@/components/thegridcn/progress-bar"
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

const TABS = ["Overview", "Traffic", "Performance", "Users"] as const

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 90 days"] as const

const KPI_CARDS = [
  {
    title: "Total Visits",
    value: "284,391",
    trend: "up" as const,
    trendValue: "+12.5%",
    sparkline: [18, 22, 19, 26, 30, 28, 34, 38, 35, 42, 46, 48],
  },
  {
    title: "Unique Visitors",
    value: "142,847",
    trend: "up" as const,
    trendValue: "+8.3%",
    sparkline: [12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 26, 28],
  },
  {
    title: "Bounce Rate",
    value: "34.2%",
    trend: "down" as const,
    trendValue: "-5.1%",
    sparkline: [42, 40, 39, 38, 37, 36, 36, 35, 35, 34, 34, 34],
  },
  {
    title: "Avg. Session",
    value: "4m 28s",
    trend: "up" as const,
    trendValue: "+18.7%",
    sparkline: [3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5],
  },
  {
    title: "Page Views",
    value: "1.24M",
    trend: "up" as const,
    trendValue: "+22.1%",
    sparkline: [60, 65, 62, 72, 78, 75, 85, 90, 88, 96, 102, 110],
  },
]

const TRAFFIC_OVER_TIME = [
  { date: "Mar 1", visits: 8240, unique: 4120, pageViews: 32400 },
  { date: "Mar 2", visits: 7890, unique: 3945, pageViews: 29800 },
  { date: "Mar 3", visits: 9120, unique: 4560, pageViews: 36200 },
  { date: "Mar 4", visits: 10340, unique: 5170, pageViews: 41500 },
  { date: "Mar 5", visits: 11200, unique: 5600, pageViews: 44800 },
  { date: "Mar 6", visits: 9800, unique: 4900, pageViews: 38400 },
  { date: "Mar 7", visits: 8650, unique: 4325, pageViews: 33200 },
  { date: "Mar 8", visits: 9400, unique: 4700, pageViews: 37600 },
  { date: "Mar 9", visits: 10800, unique: 5400, pageViews: 43200 },
  { date: "Mar 10", visits: 12100, unique: 6050, pageViews: 48400 },
  { date: "Mar 11", visits: 13500, unique: 6750, pageViews: 54000 },
  { date: "Mar 12", visits: 12800, unique: 6400, pageViews: 51200 },
  { date: "Mar 13", visits: 11600, unique: 5800, pageViews: 46400 },
  { date: "Mar 14", visits: 10200, unique: 5100, pageViews: 40800 },
]

const TRAFFIC_CHART_CONFIG: ChartConfig = {
  visits: { label: "Total Visits", color: "var(--chart-1)" },
  unique: { label: "Unique Visitors", color: "var(--chart-2)" },
}

const TOP_PAGES = [
  { page: "/", views: 48291, bounce: "28.4%", avgTime: "3m 12s" },
  { page: "/products", views: 32140, bounce: "31.2%", avgTime: "4m 45s" },
  { page: "/blog/tron-design", views: 24830, bounce: "22.8%", avgTime: "6m 18s" },
  { page: "/pricing", views: 18920, bounce: "38.5%", avgTime: "2m 54s" },
  { page: "/docs/getting-started", views: 15640, bounce: "19.2%", avgTime: "8m 32s" },
  { page: "/about", views: 12480, bounce: "42.1%", avgTime: "1m 48s" },
  { page: "/contact", views: 8920, bounce: "45.3%", avgTime: "1m 22s" },
]

const TOP_PAGES_BAR_DATA = TOP_PAGES.slice(0, 6).map((p) => ({
  page: p.page.length > 15 ? p.page.slice(0, 15) + "..." : p.page,
  views: p.views,
}))

const TOP_PAGES_BAR_CONFIG: ChartConfig = {
  views: { label: "Page Views", color: "var(--chart-1)" },
}

const TRAFFIC_SOURCES = [
  { name: "Direct", value: 38, color: "var(--chart-1)" },
  { name: "Organic", value: 32, color: "var(--chart-2)" },
  { name: "Social", value: 18, color: "var(--chart-3)" },
  { name: "Referral", value: 12, color: "var(--chart-4)" },
]

const TRAFFIC_SOURCES_CONFIG: ChartConfig = {
  direct: { label: "Direct", color: "var(--chart-1)" },
  organic: { label: "Organic", color: "var(--chart-2)" },
  social: { label: "Social", color: "var(--chart-3)" },
  referral: { label: "Referral", color: "var(--chart-4)" },
}

const HEATMAP_DATA = [
  [2, 1, 1, 1, 2, 8, 14, 22, 28, 30, 26, 24, 22, 20, 18, 22, 26, 28, 24, 18, 12, 8, 4, 3],
  [3, 2, 1, 1, 3, 10, 18, 28, 34, 36, 32, 30, 28, 26, 24, 28, 32, 34, 30, 22, 14, 10, 6, 4],
  [2, 1, 1, 1, 2, 9, 16, 26, 32, 34, 30, 28, 26, 24, 22, 26, 30, 32, 28, 20, 12, 8, 5, 3],
  [4, 2, 1, 2, 4, 12, 20, 32, 38, 42, 38, 34, 32, 30, 28, 32, 36, 40, 34, 26, 16, 12, 8, 5],
  [3, 2, 1, 1, 3, 10, 18, 28, 34, 38, 34, 30, 28, 26, 24, 28, 32, 36, 30, 22, 14, 10, 6, 4],
  [2, 1, 1, 1, 2, 6, 10, 16, 20, 22, 20, 18, 16, 14, 14, 16, 18, 20, 18, 14, 10, 6, 4, 2],
  [1, 1, 1, 1, 1, 4, 8, 12, 16, 18, 16, 14, 12, 12, 10, 12, 14, 16, 14, 10, 8, 4, 2, 1],
]

const HEATMAP_ROW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HEATMAP_COL_LABELS = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
  "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
]

type PageRow = {
  id: string
  page: string
  views: number
  bounce: string
  avgTime: string
}

const PAGES_TABLE_COLUMNS = [
  { key: "page" as const, label: "Page", sortable: true },
  {
    key: "views" as const,
    label: "Views",
    sortable: true,
    align: "right" as const,
    render: (value: unknown) => (
      <span className="font-mono text-xs text-primary">
        {(value as number).toLocaleString()}
      </span>
    ),
  },
  { key: "bounce" as const, label: "Bounce Rate", sortable: true, align: "right" as const },
  { key: "avgTime" as const, label: "Avg. Time", sortable: false, align: "right" as const },
]

const PAGES_TABLE_DATA: PageRow[] = TOP_PAGES.map((p, i) => ({
  id: `p-${i}`,
  page: p.page,
  views: p.views,
  bounce: p.bounce,
  avgTime: p.avgTime,
}))

type ReferrerRow = {
  id: string
  referrer: string
  visits: number
  conversion: string
}

const REFERRER_TABLE_COLUMNS = [
  { key: "referrer" as const, label: "Referrer", sortable: true },
  {
    key: "visits" as const,
    label: "Visits",
    sortable: true,
    align: "right" as const,
    render: (value: unknown) => (
      <span className="font-mono text-xs text-primary">
        {(value as number).toLocaleString()}
      </span>
    ),
  },
  { key: "conversion" as const, label: "Conversion", sortable: true, align: "right" as const },
]

const REFERRER_TABLE_DATA: ReferrerRow[] = [
  { id: "r-1", referrer: "google.com", visits: 42840, conversion: "4.2%" },
  { id: "r-2", referrer: "twitter.com", visits: 18920, conversion: "2.8%" },
  { id: "r-3", referrer: "github.com", visits: 12640, conversion: "6.1%" },
  { id: "r-4", referrer: "reddit.com", visits: 8430, conversion: "3.5%" },
  { id: "r-5", referrer: "youtube.com", visits: 6210, conversion: "1.9%" },
  { id: "r-6", referrer: "dev.to", visits: 4820, conversion: "5.4%" },
  { id: "r-7", referrer: "hackernews", visits: 3190, conversion: "7.2%" },
]

const BROWSER_DATA = [
  { label: "Chrome", value: 64, variant: "default" as const },
  { label: "Firefox", value: 18, variant: "success" as const },
  { label: "Safari", value: 12, variant: "warning" as const },
  { label: "Edge", value: 6, variant: "danger" as const },
]

const DEVICE_DATA = [
  { label: "Desktop", value: 58, icon: <Monitor size={12} /> },
  { label: "Mobile", value: 34, icon: <Smartphone size={12} /> },
  { label: "Tablet", value: 8, icon: <Tablet size={12} /> },
]

const REALTIME_USERS = 847

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export function AnalyticsTemplate() {
  const [activeTab, setActiveTab] = React.useState<(typeof TABS)[number]>("Overview")
  const [activeDateRange, setActiveDateRange] = React.useState<(typeof DATE_RANGES)[number]>("Last 7 days")

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ── */}
      <UplinkHeader
        leftText="ANALYTICS TERMINAL v2.1"
        rightText="LIVE DATA // MONITORING"
      />

      {/* ── Tab Navigation ── */}
      <nav className="border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center gap-0 px-4 sm:px-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                activeTab === tab
                  ? "text-primary"
                  : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)]" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6">

        {/* ── Date Range + Search ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1">
            {DATE_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setActiveDateRange(range)}
                className={`rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${
                  activeDateRange === range
                    ? "border border-primary/50 bg-primary/15 text-primary shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.1)]"
                    : "border border-transparent text-foreground/40 hover:text-foreground/70"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="w-full sm:w-64">
            <SearchInput placeholder="Search pages, events..." />
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {KPI_CARDS.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* ── Main Traffic Chart (Full Width) ── */}
        <div className="relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Traffic Overview
            </h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--chart-1)]" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/40">Visits</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--chart-2)]" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/40">Unique</span>
              </span>
            </div>
          </div>
          <ChartContainer config={TRAFFIC_CHART_CONFIG} className="h-[300px] w-full">
            <AreaChart data={TRAFFIC_OVER_TIME} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-visits)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-visits)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="uniqueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-unique)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-unique)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} />
              <XAxis
                dataKey="date"
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
              <Area
                type="monotone"
                dataKey="visits"
                stroke="var(--color-visits)"
                strokeWidth={2}
                fill="url(#visitsGradient)"
              />
              <Area
                type="monotone"
                dataKey="unique"
                stroke="var(--color-unique)"
                strokeWidth={2}
                fill="url(#uniqueGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* ── Two Column: Top Pages Bar + Traffic Sources Donut ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Top Pages Bar Chart */}
          <div className="relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Top Pages by Views
            </h3>
            <ChartContainer config={TOP_PAGES_BAR_CONFIG} className="h-[280px] w-full">
              <BarChart data={TOP_PAGES_BAR_DATA} layout="vertical" margin={{ top: 5, right: 10, left: 80, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "var(--foreground)", opacity: 0.5, fontSize: 10, fontFamily: "monospace" }}
                  axisLine={{ stroke: "var(--border)", strokeOpacity: 0.3 }}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <YAxis
                  type="category"
                  dataKey="page"
                  tick={{ fill: "var(--foreground)", opacity: 0.6, fontSize: 10, fontFamily: "monospace" }}
                  axisLine={false}
                  tickLine={false}
                  width={75}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="views"
                  fill="var(--color-views)"
                  radius={[0, 4, 4, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Traffic Sources Donut */}
          <div className="relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Traffic Sources
            </h3>
            <div className="flex items-center justify-center">
              <ChartContainer config={TRAFFIC_SOURCES_CONFIG} className="h-[240px] w-[240px]">
                <PieChart>
                  <Pie
                    data={TRAFFIC_SOURCES}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {TRAFFIC_SOURCES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} opacity={0.85} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            {/* Legend */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {TRAFFIC_SOURCES.map((source) => (
                <div key={source.name} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">
                    {source.name}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-primary">
                    {source.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Heatmap: Visitors by Day/Hour ── */}
        <Heatmap
          data={HEATMAP_DATA}
          rowLabels={HEATMAP_ROW_LABELS}
          columnLabels={HEATMAP_COL_LABELS}
          label="Visitor Activity by Day & Hour"
        />

        {/* ── Data Tables: Top Pages + Top Referrers ── */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <DataTable
            columns={PAGES_TABLE_COLUMNS}
            data={PAGES_TABLE_DATA}
            label="Top Pages"
            striped
          />
          <DataTable
            columns={REFERRER_TABLE_COLUMNS}
            data={REFERRER_TABLE_DATA}
            label="Top Referrers"
            striped
          />
        </div>

        {/* ── Bottom Row: Browser/Device Breakdown + Realtime ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Browser Breakdown */}
          <div className="space-y-4 rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Browser Distribution
            </div>
            <div className="space-y-3">
              {BROWSER_DATA.map((b) => (
                <ProgressBar
                  key={b.label}
                  value={b.value}
                  label={b.label}
                  showValue
                  size="md"
                  variant={b.variant}
                  animated
                />
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="space-y-4 rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Device Breakdown
            </div>
            <div className="space-y-3">
              {DEVICE_DATA.map((d) => (
                <div key={d.label} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary/60">{d.icon}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/60">
                      {d.label}
                    </span>
                    <span className="ml-auto font-mono text-xs text-primary">{d.value}%</span>
                  </div>
                  <ProgressBar value={d.value} size="sm" animated />
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Active Users */}
          <div className="relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              Real-time Users
            </div>
            <div className="mt-6 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <StatusDot status="online" size="md" pulse />
                <span className="font-[family-name:var(--font-orbitron)] text-4xl font-bold text-primary">
                  {REALTIME_USERS}
                </span>
              </div>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                Active right now
              </span>
              <div className="mt-4 grid w-full grid-cols-3 gap-2 border-t border-primary/10 pt-4">
                <div className="text-center">
                  <div className="font-mono text-sm font-semibold text-foreground/70">312</div>
                  <div className="font-mono text-[8px] uppercase tracking-widest text-foreground/30">/products</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm font-semibold text-foreground/70">245</div>
                  <div className="font-mono text-[8px] uppercase tracking-widest text-foreground/30">/blog</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-sm font-semibold text-foreground/70">290</div>
                  <div className="font-mono text-[8px] uppercase tracking-widest text-foreground/30">/docs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
