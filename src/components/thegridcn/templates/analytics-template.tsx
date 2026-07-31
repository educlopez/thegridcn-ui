"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { DataTable } from "@/components/thegridcn/data-table";
import { Heatmap } from "@/components/thegridcn/heatmap";
import { ProgressBar } from "@/components/thegridcn/progress-bar";
import { SearchInput } from "@/components/thegridcn/search-input";
import { StatCard } from "@/components/thegridcn/stat-card";
import { StatusDot } from "@/components/thegridcn/status-dot";
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

const TABS = ["Overview", "Traffic", "Performance", "Users"] as const;

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 90 days"] as const;

const KPI_CARDS = [
  {
    sparkline: [18, 22, 19, 26, 30, 28, 34, 38, 35, 42, 46, 48],
    title: "Total Visits",
    trend: "up" as const,
    trendValue: "+12.5%",
    value: "284,391",
  },
  {
    sparkline: [12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 26, 28],
    title: "Unique Visitors",
    trend: "up" as const,
    trendValue: "+8.3%",
    value: "142,847",
  },
  {
    sparkline: [42, 40, 39, 38, 37, 36, 36, 35, 35, 34, 34, 34],
    title: "Bounce Rate",
    trend: "down" as const,
    trendValue: "-5.1%",
    value: "34.2%",
  },
  {
    sparkline: [3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5],
    title: "Avg. Session",
    trend: "up" as const,
    trendValue: "+18.7%",
    value: "4m 28s",
  },
  {
    sparkline: [60, 65, 62, 72, 78, 75, 85, 90, 88, 96, 102, 110],
    title: "Page Views",
    trend: "up" as const,
    trendValue: "+22.1%",
    value: "1.24M",
  },
];

const TRAFFIC_OVER_TIME = [
  { date: "Mar 1", pageViews: 32_400, unique: 4120, visits: 8240 },
  { date: "Mar 2", pageViews: 29_800, unique: 3945, visits: 7890 },
  { date: "Mar 3", pageViews: 36_200, unique: 4560, visits: 9120 },
  { date: "Mar 4", pageViews: 41_500, unique: 5170, visits: 10_340 },
  { date: "Mar 5", pageViews: 44_800, unique: 5600, visits: 11_200 },
  { date: "Mar 6", pageViews: 38_400, unique: 4900, visits: 9800 },
  { date: "Mar 7", pageViews: 33_200, unique: 4325, visits: 8650 },
  { date: "Mar 8", pageViews: 37_600, unique: 4700, visits: 9400 },
  { date: "Mar 9", pageViews: 43_200, unique: 5400, visits: 10_800 },
  { date: "Mar 10", pageViews: 48_400, unique: 6050, visits: 12_100 },
  { date: "Mar 11", pageViews: 54_000, unique: 6750, visits: 13_500 },
  { date: "Mar 12", pageViews: 51_200, unique: 6400, visits: 12_800 },
  { date: "Mar 13", pageViews: 46_400, unique: 5800, visits: 11_600 },
  { date: "Mar 14", pageViews: 40_800, unique: 5100, visits: 10_200 },
];

const TRAFFIC_CHART_CONFIG: ChartConfig = {
  unique: { color: "var(--chart-2)", label: "Unique Visitors" },
  visits: { color: "var(--chart-1)", label: "Total Visits" },
};

const TOP_PAGES = [
  { avgTime: "3m 12s", bounce: "28.4%", page: "/", views: 48_291 },
  { avgTime: "4m 45s", bounce: "31.2%", page: "/products", views: 32_140 },
  {
    avgTime: "6m 18s",
    bounce: "22.8%",
    page: "/blog/tron-design",
    views: 24_830,
  },
  { avgTime: "2m 54s", bounce: "38.5%", page: "/pricing", views: 18_920 },
  {
    avgTime: "8m 32s",
    bounce: "19.2%",
    page: "/docs/getting-started",
    views: 15_640,
  },
  { avgTime: "1m 48s", bounce: "42.1%", page: "/about", views: 12_480 },
  { avgTime: "1m 22s", bounce: "45.3%", page: "/contact", views: 8920 },
];

const TOP_PAGES_BAR_DATA = TOP_PAGES.slice(0, 6).map((p) => ({
  page: p.page.length > 15 ? `${p.page.slice(0, 15)}...` : p.page,
  views: p.views,
}));

const TOP_PAGES_BAR_CONFIG: ChartConfig = {
  views: { color: "var(--chart-1)", label: "Page Views" },
};

const TRAFFIC_SOURCES = [
  { color: "var(--chart-1)", name: "Direct", value: 38 },
  { color: "var(--chart-2)", name: "Organic", value: 32 },
  { color: "var(--chart-3)", name: "Social", value: 18 },
  { color: "var(--chart-4)", name: "Referral", value: 12 },
];

const TRAFFIC_SOURCES_CONFIG: ChartConfig = {
  direct: { color: "var(--chart-1)", label: "Direct" },
  organic: { color: "var(--chart-2)", label: "Organic" },
  referral: { color: "var(--chart-4)", label: "Referral" },
  social: { color: "var(--chart-3)", label: "Social" },
};

const HEATMAP_DATA = [
  [
    2, 1, 1, 1, 2, 8, 14, 22, 28, 30, 26, 24, 22, 20, 18, 22, 26, 28, 24, 18,
    12, 8, 4, 3,
  ],
  [
    3, 2, 1, 1, 3, 10, 18, 28, 34, 36, 32, 30, 28, 26, 24, 28, 32, 34, 30, 22,
    14, 10, 6, 4,
  ],
  [
    2, 1, 1, 1, 2, 9, 16, 26, 32, 34, 30, 28, 26, 24, 22, 26, 30, 32, 28, 20,
    12, 8, 5, 3,
  ],
  [
    4, 2, 1, 2, 4, 12, 20, 32, 38, 42, 38, 34, 32, 30, 28, 32, 36, 40, 34, 26,
    16, 12, 8, 5,
  ],
  [
    3, 2, 1, 1, 3, 10, 18, 28, 34, 38, 34, 30, 28, 26, 24, 28, 32, 36, 30, 22,
    14, 10, 6, 4,
  ],
  [
    2, 1, 1, 1, 2, 6, 10, 16, 20, 22, 20, 18, 16, 14, 14, 16, 18, 20, 18, 14,
    10, 6, 4, 2,
  ],
  [
    1, 1, 1, 1, 1, 4, 8, 12, 16, 18, 16, 14, 12, 12, 10, 12, 14, 16, 14, 10, 8,
    4, 2, 1,
  ],
];

const HEATMAP_ROW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_COL_LABELS = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

// biome-ignore lint/style/useConsistentTypeDefinitions: a type alias keeps the implicit index signature DataTable needs
type PageRow = {
  avgTime: string;
  bounce: string;
  id: string;
  page: string;
  views: number;
};

const PAGES_TABLE_COLUMNS = [
  { key: "page" as const, label: "Page", sortable: true },
  {
    align: "right" as const,
    key: "views" as const,
    label: "Views",
    render: (value: unknown) => (
      <span className="font-mono text-primary text-xs">
        {(value as number).toLocaleString()}
      </span>
    ),
    sortable: true,
  },
  {
    align: "right" as const,
    key: "bounce" as const,
    label: "Bounce Rate",
    sortable: true,
  },
  {
    align: "right" as const,
    key: "avgTime" as const,
    label: "Avg. Time",
    sortable: false,
  },
];

const PAGES_TABLE_DATA: PageRow[] = TOP_PAGES.map((p, i) => ({
  avgTime: p.avgTime,
  bounce: p.bounce,
  id: `p-${i}`,
  page: p.page,
  views: p.views,
}));

// biome-ignore lint/style/useConsistentTypeDefinitions: a type alias keeps the implicit index signature DataTable needs
type ReferrerRow = {
  conversion: string;
  id: string;
  referrer: string;
  visits: number;
};

const REFERRER_TABLE_COLUMNS = [
  { key: "referrer" as const, label: "Referrer", sortable: true },
  {
    align: "right" as const,
    key: "visits" as const,
    label: "Visits",
    render: (value: unknown) => (
      <span className="font-mono text-primary text-xs">
        {(value as number).toLocaleString()}
      </span>
    ),
    sortable: true,
  },
  {
    align: "right" as const,
    key: "conversion" as const,
    label: "Conversion",
    sortable: true,
  },
];

const REFERRER_TABLE_DATA: ReferrerRow[] = [
  { conversion: "4.2%", id: "r-1", referrer: "google.com", visits: 42_840 },
  { conversion: "2.8%", id: "r-2", referrer: "twitter.com", visits: 18_920 },
  { conversion: "6.1%", id: "r-3", referrer: "github.com", visits: 12_640 },
  { conversion: "3.5%", id: "r-4", referrer: "reddit.com", visits: 8430 },
  { conversion: "1.9%", id: "r-5", referrer: "youtube.com", visits: 6210 },
  { conversion: "5.4%", id: "r-6", referrer: "dev.to", visits: 4820 },
  { conversion: "7.2%", id: "r-7", referrer: "hackernews", visits: 3190 },
];

const BROWSER_DATA = [
  { label: "Chrome", value: 64, variant: "default" as const },
  { label: "Firefox", value: 18, variant: "success" as const },
  { label: "Safari", value: 12, variant: "warning" as const },
  { label: "Edge", value: 6, variant: "danger" as const },
];

const DEVICE_DATA = [
  { icon: <Monitor size={12} />, label: "Desktop", value: 58 },
  { icon: <Smartphone size={12} />, label: "Mobile", value: 34 },
  { icon: <Tablet size={12} />, label: "Tablet", value: 8 },
];

const REALTIME_USERS = 847;

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export function AnalyticsTemplate() {
  const [activeTab, setActiveTab] =
    React.useState<(typeof TABS)[number]>("Overview");
  const [activeDateRange, setActiveDateRange] =
    React.useState<(typeof DATE_RANGES)[number]>("Last 7 days");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ── */}
      <UplinkHeader
        leftText="ANALYTICS TERMINAL v2.1"
        rightText="LIVE DATA // MONITORING"
      />

      {/* ── Tab Navigation ── */}
      <nav className="border-primary/20 border-b bg-background/80 backdrop-blur-md">
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
                <span className="absolute right-0 bottom-0 left-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)]" />
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
            <h3 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Traffic Overview
            </h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--chart-1)]" />
                <span className="font-mono text-[9px] text-foreground/40 uppercase tracking-wider">
                  Visits
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--chart-2)]" />
                <span className="font-mono text-[9px] text-foreground/40 uppercase tracking-wider">
                  Unique
                </span>
              </span>
            </div>
          </div>
          <ChartContainer
            config={TRAFFIC_CHART_CONFIG}
            className="h-[300px] w-full"
          >
            <AreaChart
              data={TRAFFIC_OVER_TIME}
              margin={{ bottom: 0, left: 0, right: 10, top: 5 }}
            >
              <defs>
                <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-visits)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-visits)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="uniqueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-unique)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-unique)"
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
                dataKey="date"
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
            <h3 className="mb-4 font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Top Pages by Views
            </h3>
            <ChartContainer
              config={TOP_PAGES_BAR_CONFIG}
              className="h-[280px] w-full"
            >
              <BarChart
                data={TOP_PAGES_BAR_DATA}
                layout="vertical"
                margin={{ bottom: 0, left: 80, right: 10, top: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.3}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{
                    fill: "var(--foreground)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    opacity: 0.5,
                  }}
                  axisLine={{ stroke: "var(--border)", strokeOpacity: 0.3 }}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <YAxis
                  type="category"
                  dataKey="page"
                  tick={{
                    fill: "var(--foreground)",
                    fontFamily: "monospace",
                    fontSize: 10,
                    opacity: 0.6,
                  }}
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
            <h3 className="mb-4 font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Traffic Sources
            </h3>
            <div className="flex items-center justify-center">
              <ChartContainer
                config={TRAFFIC_SOURCES_CONFIG}
                className="h-[240px] w-[240px]"
              >
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
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        opacity={0.85}
                      />
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
                  <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-wider">
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
            <div className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
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
            <div className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Device Breakdown
            </div>
            <div className="space-y-3">
              {DEVICE_DATA.map((d) => (
                <div key={d.label} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary/60">{d.icon}</span>
                    <span className="font-mono text-[10px] text-foreground/60 uppercase tracking-wider">
                      {d.label}
                    </span>
                    <span className="ml-auto font-mono text-primary text-xs">
                      {d.value}%
                    </span>
                  </div>
                  <ProgressBar value={d.value} size="sm" animated />
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Active Users */}
          <div className="relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            <div className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Real-time Users
            </div>
            <div className="mt-6 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <StatusDot status="online" size="md" pulse />
                <span className="font-[family-name:var(--font-orbitron)] font-bold text-4xl text-primary">
                  {REALTIME_USERS}
                </span>
              </div>
              <span className="mt-2 font-mono text-[10px] text-foreground/40 uppercase tracking-widest">
                Active right now
              </span>
              <div className="mt-4 grid w-full grid-cols-3 gap-2 border-primary/10 border-t pt-4">
                <div className="text-center">
                  <div className="font-mono font-semibold text-foreground/70 text-sm">
                    312
                  </div>
                  <div className="font-mono text-[8px] text-foreground/30 uppercase tracking-widest">
                    /products
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-mono font-semibold text-foreground/70 text-sm">
                    245
                  </div>
                  <div className="font-mono text-[8px] text-foreground/30 uppercase tracking-widest">
                    /blog
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-mono font-semibold text-foreground/70 text-sm">
                    290
                  </div>
                  <div className="font-mono text-[8px] text-foreground/30 uppercase tracking-widest">
                    /docs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
