"use client"

import * as React from "react"
import { SectionWrapper, ComponentCard } from "./section-wrapper"
import {
  DataCard,
  Alert,
  AlertBanner,
  Timer,
  Countdown,
  DerezTimer,
  Reticle,
  HUDFrame,
  Stat,
  SpeedIndicator,
  RegenIndicator,
  VideoPlayer,
  FastForwardOverlay,
  StatusBar,
  InfoPanel,
  UplinkBar,
  ProgressTimeline,
  MapMarker,
  CoordinateDisplay,
  Radar,
  Terminal,
  EnergyMeter,
  ProgressRing,
  DiagnosticsPanel,
  IdentityDisc,
  Gauge,
  Waveform,
  DataStream,
  BootSequence,
  SignalIndicator,
  Notification,
  Stepper,
  Tag,
  StatCard,
  Sparkline,
  FeatureCard,
  PricingCard,
  TestimonialCard,
  StatsCounter,
  CTABanner,
  Heatmap,
  LogoCloud,
  ComparisonTable,
  Changelog,
  ProgressBar,
  AvatarGroup,
  BentoGrid,
  Marquee,
  Divider,
  AgentAvatar,
  FAQ,
  Timeline,
  AnnouncementBar,
  DataTable,
  Rating,
  Skeleton,
  BreadcrumbNav,
  CommandMenu,
  Tabs,
  Tooltip,
  Toggle,
  Pagination,
  KanbanBoard,
} from "@/components/thegridcn"

export function TronMovieSection() {
  const [videoStatus, setVideoStatus] = React.useState<"playing" | "paused">("paused")

  return (
    <SectionWrapper
      title="Tron: Ares Movie UI"
      description="Authentic UI elements inspired by the Tron: Ares movie interfaces"
    >
      {/* Data Cards / Dossiers */}
      <ComponentCard title="Data Cards (Dossier Style)">
        <div className="grid gap-4 md:grid-cols-2">
          <DataCard
            subtitle="RECORDED SUBJECT"
            title="AJAY SINGH"
            status="active"
            fields={[
              { label: "DOB", value: "02 MAY 1985 [DAVIS, CA, USA]", highlight: true },
              { label: "EMPLOYER", value: "ENCOM" },
              { label: "POSITION", value: "CHIEF TECHNOLOGY OFFICER [2020 - PRESENT]" },
              { label: "NET WORTH", value: "5.7 BILLION US", highlight: true },
              { label: "SPOUSE", value: "CLASSIFIED" },
            ]}
          />

          <DataCard
            subtitle="PROGRAM PROFILE"
            title="ARES"
            status="alert"
            fields={[
              { label: "DESIGNATION", value: "COMBAT PROGRAM" },
              { label: "STATUS", value: "ACTIVE", highlight: true },
              { label: "THREAT LEVEL", value: "MAXIMUM" },
              { label: "ORIGIN", value: "SECTOR 7" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Alert Banners */}
      <ComponentCard title="Alert Banners">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Alert variant="warning">ANOMALY FOUND</Alert>
            <Alert variant="danger">THREAT DETECTED</Alert>
            <Alert variant="info">SYSTEM ONLINE</Alert>
            <Alert variant="success" animated={false}>SCAN COMPLETE</Alert>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AlertBanner
              title="ANOMALY DETECTED"
              subtitle="PRIORITY ALERT"
              variant="warning"
            />
            <AlertBanner
              title="DERESOLUTION IMMINENT"
              subtitle="CRITICAL WARNING"
              variant="danger"
            />
          </div>
        </div>
      </ComponentCard>

      {/* Timers & Countdowns */}
      <ComponentCard title="Timers & Countdowns">
        <div className="space-y-8">
          <Timer
            hours={4}
            minutes={27}
            seconds={53}
            label="ELAPSED"
            sublabel="19:21:42"
            size="lg"
          />

          <div className="flex flex-wrap items-center gap-6">
            <Countdown value="00:38 MINUTES" label="EVE KIM ARRIVAL" variant="danger" />
            <DerezTimer minutes={16} seconds={48} milliseconds={50} />
          </div>

          <Timer
            hours={0}
            minutes={8}
            seconds={24}
            label="ELAPSED"
            size="md"
            variant="elapsed"
          />
        </div>
      </ComponentCard>

      {/* HUD Elements */}
      <ComponentCard title="HUD Elements">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Targeting Reticles */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Reticle size={100} variant="default" />
            <Reticle size={100} variant="locked" />
            <Reticle size={100} variant="scanning" />
          </div>

          {/* HUD Frame */}
          <HUDFrame label="SYSTEM STATUS">
            <div className="space-y-3">
              <Stat label="SPEED" value={160} unit="KM/H" direction="up" />
              <Stat label="ACCEL" value={2.76} unit="G" direction="neutral" />
              <Stat label="TEMP" value={78} unit="°C" direction="down" />
            </div>
          </HUDFrame>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
          <SpeedIndicator speed={160} />
          <RegenIndicator />
        </div>
      </ComponentCard>

      {/* Video Player */}
      <ComponentCard title="Video Player Controls">
        <div className="grid gap-6 lg:grid-cols-2">
          <VideoPlayer
            currentTime="08:24:22"
            status={videoStatus}
            onPlay={() => setVideoStatus("playing")}
            onPause={() => setVideoStatus("paused")}
          >
            <div className="flex h-full items-center justify-center text-muted-foreground">
              [VIDEO FEED]
            </div>
          </VideoPlayer>

          <div className="flex items-center justify-center rounded border border-primary/30 bg-card">
            <FastForwardOverlay direction="forward" className="h-full w-full py-8" />
          </div>
        </div>
      </ComponentCard>

      {/* Status Bars */}
      <ComponentCard title="Status Bars & Panels">
        <div className="space-y-4">
          <UplinkBar
            channel="ORBITAL RELAY CHANNEL 27A"
            status="RADAR CROSS SECTION: 2.1M² - NONSTANDARD REFLECTION"
            signal="strong"
          />

          <StatusBar
            leftContent={
              <span>SYSTEM: ACTIVE</span>
            }
            rightContent={
              <>
                <span>LAT: 59.90753° N</span>
                <span>LNG: 134.89466° W</span>
              </>
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            <InfoPanel
              title="AIRCRAFT N-T355 INBOUND..."
              subtitle="MOTORIZATION"
              status="pending"
              timestamp="12:58:18:07"
            >
              <Countdown value="00:38 MINUTES" label="EVE KIM ARRIVAL" variant="danger" />
            </InfoPanel>

            <InfoPanel
              title="CITRUS SINENSIS"
              subtitle="ANALYSIS ACTIVE"
              status="active"
            >
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">APPROX AGE:</span>
                  <span className="text-primary">5 HOURS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">THERMAL:</span>
                  <span>+8.2°C ABV AMBIENT</span>
                </div>
              </div>
            </InfoPanel>
          </div>

          <ProgressTimeline
            progress={35}
            markers={[
              { position: 10, active: true },
              { position: 25, active: true },
              { position: 50, active: false },
              { position: 75, active: false },
            ]}
            currentLabel="ANOMALY DETECTED"
          />
        </div>
      </ComponentCard>

      {/* Map Elements */}
      <ComponentCard title="Map & Location Elements">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Map Markers */}
          <div className="flex h-64 items-end justify-around rounded border border-border/50 bg-muted/20 px-4 pb-8">
            <MapMarker label="ARES" variant="danger" showBeam />
            <MapMarker label="EVE" variant="primary" coordinates="1 732m" />
            <MapMarker label="ATHENA" variant="danger" showBeam />
          </div>

          {/* Radar & Coordinates */}
          <div className="flex flex-col items-center justify-center gap-4">
            <Radar
              size={180}
              targets={[
                { x: 30, y: 35 },
                { x: 65, y: 45 },
                { x: 45, y: 70 },
              ]}
            />
            <CoordinateDisplay
              heading={76}
              bearing="NE"
              latitude="40.2033167"
              longitude="-123.1159558"
              label="SAT ALPHA 23.384"
            />
          </div>
        </div>
      </ComponentCard>

      {/* Terminal & Diagnostics */}
      <ComponentCard title="Terminal & System Monitoring">
        <div className="grid gap-4 md:grid-cols-2">
          <Terminal
            title="GRID CONSOLE"
            lines={[
              { text: "BOOT SEQUENCE INITIATED", type: "system" },
              { text: "grid --status", type: "input" },
              { text: "All sectors operational", type: "output" },
              { text: "ANOMALY DETECTED IN SECTOR 7G", type: "error" },
            ]}
          />
          <DiagnosticsPanel
            title="SYSTEM HEALTH"
            status="online"
            metrics={[
              { label: "CPU", value: 67 },
              { label: "MEMORY", value: 82, status: "warning" },
              { label: "DISK I/O", value: 34 },
              { label: "NETWORK", value: 91, status: "critical" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Energy & Progress */}
      <ComponentCard title="Energy Meters & Progress Rings">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <EnergyMeter value={85} label="POWER CORE" showValue />
            <EnergyMeter value={45} label="SHIELD MATRIX" showValue />
            <EnergyMeter value={15} label="FUEL RESERVES" showValue />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <ProgressRing value={78} size="md" label="UPLOAD" />
            <ProgressRing value={45} size="md" label="SCAN" variant="warning" />
            <ProgressRing value={92} size="md" label="SYNC" variant="success" />
            <ProgressRing value={23} size="md" label="SHIELD" variant="danger" />
          </div>
        </div>
      </ComponentCard>

      {/* Identity Discs */}
      <ComponentCard title="Identity Discs">
        <div className="flex flex-wrap items-start justify-center gap-8">
          <IdentityDisc
            name="ARES"
            designation="COMBAT PROGRAM"
            id="PRG-0042"
            accessLevel="system"
            status="active"
          />
          <IdentityDisc
            name="EVE KIM"
            designation="ANALYST"
            id="USR-1138"
            accessLevel="admin"
            status="active"
          />
          <IdentityDisc
            name="UNKNOWN"
            designation="DEREZZED"
            id="ERR-0000"
            accessLevel="user"
            status="derezzed"
          />
        </div>
      </ComponentCard>

      {/* Gauges & Signals */}
      <ComponentCard title="Gauges & Signal Indicators">
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-center gap-6">
            <Gauge value={72} label="SPEED" unit="KM/H" size="md" />
            <Gauge value={45} label="TEMP" unit="°C" size="md" variant="warning" />
            <Gauge value={92} label="LOAD" unit="%" size="md" variant="danger" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SignalIndicator strength={90} label="UPLINK" showValue />
            <SignalIndicator strength={45} label="RELAY" showValue />
            <SignalIndicator strength={10} label="BEACON" showValue />
          </div>
        </div>
      </ComponentCard>

      {/* Waveform & Data Stream */}
      <ComponentCard title="Audio Waveform & Live Data">
        <div className="grid gap-4 md:grid-cols-2">
          <Waveform label="AUDIO FEED" bars={32} playing intensity="high" />
          <DataStream
            title="EVENT LOG"
            entries={[
              { timestamp: "12:00:01", text: "Connection established", type: "success" },
              { timestamp: "12:00:03", text: "Scanning sector 7G...", type: "info" },
              { timestamp: "12:00:05", text: "Anomaly detected", type: "warning" },
              { timestamp: "12:00:07", text: "Breach attempt blocked", type: "error" },
              { timestamp: "12:00:09", text: "Diagnostic complete", type: "success" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Boot Sequence & Stepper */}
      <ComponentCard title="Boot Sequence & Process Steps">
        <div className="grid gap-4 md:grid-cols-2">
          <BootSequence
            title="GRID INITIALIZATION"
            steps={[
              { label: "Loading kernel modules", duration: 500 },
              { label: "Initializing network", duration: 700 },
              { label: "Mounting filesystem", duration: 400 },
              { label: "Security protocols", duration: 600 },
              { label: "System ready", duration: 300 },
            ]}
          />
          <Stepper
            currentStep={2}
            orientation="vertical"
            steps={[
              { label: "Initialize", description: "Boot core systems" },
              { label: "Authenticate", description: "Verify identity disc" },
              { label: "Connect", description: "Establish grid link" },
              { label: "Deploy", description: "Launch program" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Notifications & Tags */}
      <ComponentCard title="Notifications & Tags">
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Notification title="System Update" description="Grid firmware v2.7.1 available." variant="info" timestamp="12:34" />
            <Notification title="Scan Complete" description="All sectors clear." variant="success" timestamp="12:35" />
            <Notification title="High Energy" description="Power core at 89%." variant="warning" timestamp="12:36" />
            <Notification title="Connection Lost" description="Relay node 7G unreachable." variant="error" timestamp="12:37" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Tag variant="default" glow>PROGRAM</Tag>
            <Tag variant="success" glow>ACTIVE</Tag>
            <Tag variant="warning">STANDBY</Tag>
            <Tag variant="danger" glow>DEREZZED</Tag>
            <Tag variant="outline">ARCHIVED</Tag>
            <Tag variant="default" size="md" glow>SECTOR 7G</Tag>
          </div>
        </div>
      </ComponentCard>

      {/* Dashboard KPI Cards */}
      <ComponentCard title="Dashboard Stat Cards & Sparklines">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="ACTIVE PROGRAMS"
              value={12847}
              trend="up"
              trendValue="+12.5%"
              sparkline={[20, 35, 28, 45, 42, 55, 60, 58, 72]}
            />
            <StatCard
              title="RESPONSE TIME"
              value={42}
              unit="ms"
              trend="down"
              trendValue="-8.3%"
              sparkline={[80, 72, 65, 58, 50, 45, 48, 42]}
            />
            <StatCard
              title="GRID UPTIME"
              value="99.97"
              unit="%"
              trend="neutral"
              trendValue="STABLE"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <Sparkline data={[10, 25, 18, 35, 28, 42, 55, 48, 62]} variant="success" />
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">GROWTH</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Sparkline data={[60, 55, 48, 52, 45, 38, 42, 35, 30]} variant="danger" />
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">LATENCY</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Sparkline data={[30, 35, 32, 38, 34, 36, 33, 37, 35]} width={150} />
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">STABLE</span>
            </div>
          </div>
        </div>
      </ComponentCard>

      {/* Landing Page Components */}
      <ComponentCard title="Landing Page: Features & Pricing">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 4h16v12H2z" stroke="currentColor" strokeWidth="1.5"/><path d="M2 10h16M7 4v12M13 4v12" stroke="currentColor" strokeWidth="0.75" opacity="0.5"/><circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.6"/></svg>}
              title="Grid Architecture"
              description="Distributed processing across all sectors with real-time sync."
            />
            <FeatureCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>}
              title="Identity Protocols"
              description="Disc-based authentication with multi-layer encryption."
              variant="highlight"
            />
            <FeatureCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l8 14H2L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="14" r="0.8" fill="currentColor"/></svg>}
              title="Derez Protection"
              description="Automated threat response with sub-millisecond intervention."
            />
          </div>
          <StatsCounter
            columns={4}
            items={[
              { value: 12847, label: "ACTIVE USERS" },
              { value: 99, suffix: "%", label: "UPTIME" },
              { value: 42, suffix: "ms", label: "AVG LATENCY" },
              { value: 847, label: "GRID SECTORS" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Testimonials & CTA */}
      <ComponentCard title="Testimonials & Call to Action">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <TestimonialCard
              quote="The Grid architecture transformed our infrastructure. Response times dropped by 60%."
              author="Ajay Singh"
              role="CTO, ENCOM"
              rating={5}
            />
            <TestimonialCard
              quote="Identity disc protocols are the most secure authentication we've deployed."
              author="Eve Kim"
              role="Security Lead"
              rating={4}
            />
          </div>
          <CTABanner
            title="ENTER THE GRID"
            description="Join thousands of programs running on the most advanced distributed architecture."
            primaryAction={{ label: "GET STARTED" }}
            secondaryAction={{ label: "VIEW DOCS" }}
            variant="highlight"
          />
        </div>
      </ComponentCard>

      {/* Heatmap */}
      <ComponentCard title="Grid Activity Heatmap">
        <Heatmap
          label="SECTOR ACTIVITY (7 DAYS)"
          rowLabels={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
          columnLabels={["00", "04", "08", "12", "16", "20"]}
          data={[
            [2, 0, 5, 8, 7, 3],
            [1, 0, 6, 10, 9, 4],
            [3, 1, 7, 12, 8, 5],
            [0, 0, 4, 9, 10, 6],
            [2, 1, 8, 11, 7, 2],
            [5, 3, 4, 6, 3, 1],
            [4, 2, 3, 5, 2, 0],
          ]}
        />
      </ComponentCard>

      {/* Logo Cloud & Marquee */}
      <ComponentCard title="Logo Cloud & Scrolling Marquee">
        <div className="space-y-4">
          <LogoCloud
            label="TRUSTED BY LEADING PROGRAMS"
            logos={[
              { name: "ENCOM", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
              { name: "GRID SYSTEMS", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg> },
              { name: "FLYNN LABS", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l5.5 3v6L8 14 2.5 11V5L8 2z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v6M5.5 6.5L8 8l2.5-1.5" stroke="currentColor" strokeWidth="1"/></svg> },
              { name: "DISC CORP", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1"/><circle cx="8" cy="8" r="0.8" fill="currentColor"/></svg> },
              { name: "SECTOR 7G", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h12v12H2z" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2"/><circle cx="5" cy="5" r="1" fill="currentColor"/><circle cx="11" cy="11" r="1" fill="currentColor"/></svg> },
            ]}
          />
          <Marquee speed="normal">
            {["SYSTEM ONLINE", "ALL SECTORS CLEAR", "GRID STABLE", "UPLINK ACTIVE"].map((t, i) => (
              <span key={i} className="shrink-0 font-mono text-xs uppercase tracking-widest text-primary/70">
                ◆ {t}
              </span>
            ))}
          </Marquee>
        </div>
      </ComponentCard>

      {/* Comparison Table & Changelog */}
      <ComponentCard title="Feature Comparison & Changelog">
        <div className="space-y-4">
          <ComparisonTable
            columns={[{ name: "Basic" }, { name: "Pro", highlighted: true }, { name: "System" }]}
            features={[
              { name: "Grid Sectors", values: ["5", "Unlimited", "Unlimited"] },
              { name: "Priority Relay", values: [false, true, true] },
              { name: "Custom Protocols", values: [false, false, true] },
            ]}
          />
          <Changelog
            entries={[
              { version: "2.7.1", date: "2026-02-28", title: "Performance Boost", type: "improvement" },
              { version: "2.7.0", date: "2026-02-20", title: "Identity Disc 2FA", type: "feature" },
              { version: "2.6.4", date: "2026-02-15", title: "Fixed Relay Timeout", type: "fix" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Progress Bars & Avatars & Dividers */}
      <ComponentCard title="Progress Bars, Avatars & Dividers">
        <div className="space-y-5">
          <ProgressBar value={78} label="UPLOAD" showValue />
          <ProgressBar value={45} label="SCAN" showValue variant="warning" striped />
          <ProgressBar value={92} label="SYNC" showValue variant="success" size="lg" />
          <Divider variant="glow" label="TEAM" />
          <AvatarGroup
            size="lg"
            users={[
              { name: "Ares", avatar: <AgentAvatar seed="Ares" size={44} hue={200} />, status: "online" },
              { name: "Eve Kim", avatar: <AgentAvatar seed="Eve Kim" size={44} hue={30} />, status: "online" },
              { name: "Ajay Singh", avatar: <AgentAvatar seed="Ajay Singh" size={44} hue={185} />, status: "away" },
              { name: "Tron", avatar: <AgentAvatar seed="Tron" size={44} hue={200} />, status: "online" },
              { name: "Clu", avatar: <AgentAvatar seed="Clu" size={44} hue={30} />, status: "offline" },
              { name: "Quorra", avatar: <AgentAvatar seed="Quorra" size={44} hue={200} /> },
            ]}
            max={5}
          />
        </div>
      </ComponentCard>

      {/* Bento Grid */}
      <ComponentCard title="Bento Grid Layout">
        <BentoGrid
          columns={3}
          items={[
            { title: "Grid Architecture", description: "Distributed processing across all sectors.", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12v8H2z" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h12M6 4v8M10 4v8" stroke="currentColor" strokeWidth="0.75" opacity="0.5"/></svg>, span: "2x1", variant: "highlight" },
            { title: "Identity Disc", description: "Biometric auth layer.", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1"/><circle cx="8" cy="8" r="0.8" fill="currentColor"/></svg> },
            { title: "Derez Shield", description: "Threat response.", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l5 3v4.5c0 2.5-2.2 4.2-5 5.5-2.8-1.3-5-3-5-5.5V5l5-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6 8l1.5 1.5L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { title: "Sector Monitor", description: "Real-time grid activity dashboard.", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M3 9l2.5-3 2 2L11 5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>, span: "2x1" },
          ]}
        />
      </ComponentCard>

      {/* FAQ & Timeline */}
      <ComponentCard title="FAQ & Product Timeline">
        <div className="grid gap-4 md:grid-cols-2">
          <FAQ
            items={[
              { question: "What is The Grid?", answer: "A distributed computing architecture that connects all sectors through encrypted relay channels." },
              { question: "How do Identity Discs work?", answer: "Each program is assigned a unique disc that stores their identity, permissions, and combat data." },
              { question: "What happens during deresolution?", answer: "The program is permanently deleted from the system. All data is lost." },
            ]}
          />
          <Timeline
            items={[
              { title: "Grid v1.0", description: "Initial system launch", status: "completed", date: "2024 Q1" },
              { title: "Identity Protocols", description: "Disc-based auth system", status: "completed", date: "2024 Q3" },
              { title: "Sector Expansion", description: "Scale to 1000+ sectors", status: "active", date: "2025 Q1" },
              { title: "Neural Uplink", description: "Direct consciousness transfer", status: "upcoming", date: "2025 Q4" },
            ]}
          />
        </div>
      </ComponentCard>

      {/* Announcement, Breadcrumb, Rating */}
      <ComponentCard title="Announcement, Navigation & Ratings">
        <div className="space-y-4">
          <AnnouncementBar
            text="Grid v2.7.1 is now live — improved relay speed by 40%"
            variant="highlight"
            action={{ label: "VIEW CHANGELOG" }}
          />
          <BreadcrumbNav
            items={[
              { label: "Grid", href: "#" },
              { label: "Sector 7G", href: "#" },
              { label: "Terminal 42", active: true },
            ]}
          />
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <Rating value={5} size="md" />
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">EXCELLENT</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Rating value={3} size="md" />
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">MODERATE</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Rating value={1} size="md" />
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">CRITICAL</span>
            </div>
          </div>
        </div>
      </ComponentCard>

      {/* Data Table & Skeleton */}
      <ComponentCard title="Data Tables & Loading States">
        <div className="grid gap-4 md:grid-cols-2">
          <DataTable
            columns={[
              { key: "sector", label: "SECTOR", sortable: true },
              { key: "status", label: "STATUS" },
              { key: "load", label: "LOAD %", sortable: true },
            ]}
            data={[
              { sector: "7G", status: "ONLINE", load: 87 },
              { sector: "12A", status: "DEGRADED", load: 94 },
              { sector: "3F", status: "ONLINE", load: 42 },
              { sector: "9B", status: "OFFLINE", load: 0 },
            ]}
          />
          <div className="space-y-4">
            <Skeleton variant="card" />
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
      </ComponentCard>

      {/* Tabs, Toggles & Tooltips */}
      <ComponentCard title="Tabs, Toggles & Tooltips">
        <div className="space-y-6">
          <Tabs
            tabs={[
              { label: "Overview", value: "overview" },
              { label: "Metrics", value: "metrics" },
              { label: "Logs", value: "logs" },
            ]}
            defaultValue="overview"
          >
            <div className="rounded border border-primary/15 bg-card/60 p-4 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              Tab content area — switch tabs to navigate sections
            </div>
          </Tabs>
          <div className="flex flex-wrap items-center gap-6">
            <Toggle defaultChecked label="GRID UPLINK" />
            <Toggle label="STEALTH MODE" />
            <Toggle defaultChecked label="AUTO-SCAN" size="sm" />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="SYSTEM: ONLINE" side="top">
              <span className="rounded border border-primary/20 px-3 py-1 font-mono text-[10px] text-foreground/50 hover:text-primary">
                Hover me
              </span>
            </Tooltip>
            <Tooltip content="ENCRYPTED RELAY" side="bottom">
              <span className="rounded border border-primary/20 px-3 py-1 font-mono text-[10px] text-foreground/50 hover:text-primary">
                Hover me too
              </span>
            </Tooltip>
          </div>
        </div>
      </ComponentCard>

      {/* Pagination */}
      <ComponentCard title="Pagination">
        <div className="flex justify-center">
          <Pagination currentPage={3} totalPages={12} onPageChange={() => {}} />
        </div>
      </ComponentCard>

      {/* Kanban Board */}
      <ComponentCard title="Kanban Task Board">
        <KanbanBoard
          title="GRID OPERATIONS"
          columns={[
            {
              id: "queue", title: "Queued", color: "hsl(var(--primary))",
              cards: [
                { id: "1", title: "Deploy relay node", description: "Sector 12A coverage", tag: "INFRA" },
                { id: "2", title: "Update firmware", tag: "MAINT", tagVariant: "warning" },
              ],
            },
            {
              id: "active", title: "In Progress", color: "#22c55e",
              cards: [
                { id: "3", title: "Anomaly investigation", description: "Sector 7G", tag: "URGENT", tagVariant: "danger", assignee: "Ares" },
              ],
            },
            {
              id: "done", title: "Complete", color: "#6b7280",
              cards: [
                { id: "4", title: "Perimeter scan", tag: "DONE", tagVariant: "success", assignee: "Eve" },
              ],
            },
          ]}
        />
      </ComponentCard>

      {/* Complete HUD Demo */}
      <ComponentCard title="Complete HUD Demo">
        <div className="relative h-96 overflow-hidden rounded-lg border border-primary/30 bg-black">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Top bar */}
          <div className="absolute left-0 right-0 top-0">
            <UplinkBar
              channel="ORBITAL RELAY CHANNEL 27A"
              status="ACTIVE"
              signal="strong"
            />
          </div>

          {/* Left panel */}
          <div className="absolute left-4 top-16 w-48">
            <DataCard
              subtitle="TARGET"
              title="EVE KIM"
              status="active"
              fields={[
                { label: "STATUS", value: "INBOUND" },
                { label: "ETA", value: "38 MIN", highlight: true },
              ]}
            />
          </div>

          {/* Center reticle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Reticle size={150} variant="scanning" />
          </div>

          {/* Right panel */}
          <div className="absolute right-4 top-16">
            <DerezTimer minutes={16} seconds={48} milliseconds={50} />
            <div className="mt-4">
              <SpeedIndicator speed={160} />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <ProgressTimeline
              progress={42}
              markers={[{ position: 42, active: true }]}
              currentLabel="TRACKING"
            />
          </div>

          {/* Alert */}
          <div className="absolute left-1/2 top-24 -translate-x-1/2">
            <Alert variant="warning" animated>ANOMALY FOUND</Alert>
          </div>
        </div>
      </ComponentCard>
    </SectionWrapper>
  )
}
