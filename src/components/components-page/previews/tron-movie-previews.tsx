"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  DataCard,
  AlertBanner,
  Timer,
  Countdown,
  DerezTimer,
  Reticle,
  HUDFrame,
  Stat,
  SpeedIndicator,
  RegenIndicator,
  StatusBar,
  Radar,
  VideoPlayer,
  AnomalyBanner,
  HUDCornerFrame,
  VideoProgress,
  FloatingPanel,
  GridScanOverlay,
  LocationDisplay,
  UplinkHeader,
  ArrivalPanel,
  BeamMarker,
  TimelineBar,
  CircuitBackground,
  GlowContainer,
  CRTEffect,
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
} from "@/components/thegridcn";

// Dynamic 3D components
const Grid3D = dynamic(
  () => import("@/components/thegridcn/grid").then((mod) => mod.Grid3D),
  { ssr: false }
);
const Tunnel = dynamic(
  () => import("@/components/thegridcn/tunnel").then((mod) => mod.Tunnel),
  { ssr: false }
);
const GodAvatar3D = dynamic(
  () => import("@/components/website/god-avatar").then((mod) => mod.GodAvatar3D),
  { ssr: false }
);

export const DataCardPreview = React.memo(function DataCardPreview() {
  return (
    <div className="space-y-4">
      <DataCard
        subtitle="RECORDED SUBJECT"
        title="AJAY SINGH"
        status="active"
        fields={[
          {
            label: "DOB",
            value: "02 MAY 1985 [DAVIS, CA, USA]",
            highlight: true,
          },
          { label: "EMPLOYER", value: "ENCOM" },
          {
            label: "POSITION",
            value: "CHIEF TECHNOLOGY OFFICER [2020 - PRESENT]",
          },
        ]}
      />
    </div>
  );
});

export const AlertBannerPreview = React.memo(function AlertBannerPreview() {
  return (
    <div className="space-y-4">
      <AlertBanner variant="info" title="System update available" />
      <AlertBanner
        variant="warning"
        title="Warning: High energy consumption detected"
      />
      <AlertBanner variant="danger" title="Error: Connection lost" />
    </div>
  );
});

export const TimerPreview = React.memo(function TimerPreview() {
  return (
    <div className="space-y-4">
      <Timer
        hours={4}
        minutes={27}
        seconds={53}
        label="ELAPSED"
        sublabel="19:21:42"
        size="lg"
      />
      <Timer
        hours={0}
        minutes={8}
        seconds={24}
        label="SESSION"
        size="md"
        variant="elapsed"
      />
    </div>
  );
});

export const CountdownPreview = React.memo(function CountdownPreview() {
  return (
    <div className="space-y-4">
      <Countdown
        value="00:38 MINUTES"
        label="EVE KIM ARRIVAL"
        variant="danger"
      />
      <Countdown value="12:45" label="SESSION TIME" variant="default" />
      <Countdown value="05:30" label="WARNING" variant="warning" />
    </div>
  );
});

export const DerezTimerPreview = React.memo(function DerezTimerPreview() {
  return (
    <div className="space-y-4">
      <DerezTimer minutes={16} seconds={48} milliseconds={50} />
      <DerezTimer minutes={5} seconds={30} />
    </div>
  );
});

export const ReticlePreview = React.memo(function ReticlePreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <Reticle size={100} variant="default" />
        <Reticle size={100} variant="locked" />
        <Reticle size={100} variant="scanning" />
      </div>
    </div>
  );
});

export const HUDFramePreview = React.memo(function HUDFramePreview() {
  return (
    <div className="space-y-4">
      <HUDFrame label="SYSTEM STATUS">
        <div className="space-y-3">
          <Stat label="SPEED" value={160} unit="KM/H" direction="up" />
          <Stat
            label="ACCEL"
            value={2.76}
            unit="G"
            direction="neutral"
          />
          <Stat label="TEMP" value={78} unit="°C" direction="down" />
        </div>
      </HUDFrame>
    </div>
  );
});

export const StatPreview = React.memo(function StatPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-6">
        <Stat label="SPEED" value={160} unit="KM/H" direction="up" />
        <Stat label="ACCEL" value={2.76} unit="G" direction="neutral" />
        <Stat label="TEMP" value={78} unit="°C" direction="down" />
        <Stat label="POWER" value={95} unit="%" direction="up" />
      </div>
    </div>
  );
});

export const SpeedIndicatorPreview = React.memo(function SpeedIndicatorPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <SpeedIndicator speed={160} />
        <SpeedIndicator speed={85} />
        <SpeedIndicator speed={240} />
      </div>
    </div>
  );
});

export const RegenIndicatorPreview = React.memo(function RegenIndicatorPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <RegenIndicator />
      </div>
    </div>
  );
});

export const StatusBarPreview = React.memo(function StatusBarPreview() {
  return (
    <div className="space-y-4">
      <StatusBar
        leftContent={<span>SYSTEM: ACTIVE</span>}
        rightContent={
          <>
            <span>LAT: 59.90753° N</span>
            <span>LNG: 134.89466° W</span>
          </>
        }
      />
      <StatusBar
        variant="alert"
        leftContent={<span>WARNING: ANOMALY DETECTED</span>}
        rightContent={<span>PRIORITY: HIGH</span>}
      />
      <StatusBar
        variant="info"
        leftContent={<span>INFO: SYSTEM UPDATE</span>}
        rightContent={<span>STATUS: ONLINE</span>}
      />
    </div>
  );
});

export const RadarPreview = React.memo(function RadarPreview() {
  return (
    <div className="space-y-4">
      <Radar
        size={200}
        targets={[
          { x: 30, y: 35 },
          { x: 70, y: 60 },
        ]}
      />
    </div>
  );
});

// New GridCN Previews

export const Grid3DPreview = React.memo(function Grid3DPreview() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-primary/30">
      <Grid3D className="h-full w-full" enableParticles enableBeams cameraAnimation />
    </div>
  );
});

export const TunnelPreview = React.memo(function TunnelPreview() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-primary/30">
      <Tunnel className="h-full w-full" ringCount={15} enableSpeedLines />
    </div>
  );
});

export const GodAvatarPreview = React.memo(function GodAvatarPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <GodAvatar3D themeId="ares" color="#ff3333" size={100} />
        <span className="font-mono text-xs text-foreground/80">ARES</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <GodAvatar3D themeId="tron" color="#00d4ff" size={100} />
        <span className="font-mono text-xs text-foreground/80">TRON</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <GodAvatar3D themeId="clu" color="#ff6600" size={100} />
        <span className="font-mono text-xs text-foreground/80">CLU</span>
      </div>
    </div>
  );
});

export const VideoPlayerPreview = React.memo(function VideoPlayerPreview() {
  return (
    <div className="space-y-4">
      <VideoPlayer
        currentTime="00:04:27"
        status="playing"
        className="h-[300px]"
      />
    </div>
  );
});

export const CircuitBackgroundPreview = React.memo(function CircuitBackgroundPreview() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg border border-primary/30">
      <CircuitBackground className="h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="rounded border border-primary/50 bg-background/80 px-4 py-2 font-mono text-sm text-primary">
          Circuit Background Effect
        </span>
      </div>
    </div>
  );
});

export const GlowContainerPreview = React.memo(function GlowContainerPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GlowContainer intensity="sm">
        <div className="font-mono text-sm">Small Glow</div>
      </GlowContainer>
      <GlowContainer intensity="md">
        <div className="font-mono text-sm">Medium Glow</div>
      </GlowContainer>
      <GlowContainer intensity="lg" pulse>
        <div className="font-mono text-sm">Large Glow (Pulse)</div>
      </GlowContainer>
    </div>
  );
});

export const CRTEffectPreview = React.memo(function CRTEffectPreview() {
  return (
    <div className="space-y-4">
      {/* Main demo with content */}
      <CRTEffect className="h-[200px] w-full rounded-lg border border-primary/30 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
          <div className="font-display text-2xl font-bold tracking-wider text-primary">
            CRT MONITOR EFFECT
          </div>
          <div className="font-mono text-xs text-foreground/80">
            [ SCANLINES + VIGNETTE + SWEEP ]
          </div>
        </div>
      </CRTEffect>

      {/* Intensity comparison */}
      <div className="grid grid-cols-3 gap-2">
        <CRTEffect intensity="light" animated={false} className="h-20 rounded border border-primary/20 bg-primary/10">
          <div className="flex h-full items-center justify-center font-mono text-xs text-primary/70">
            Light
          </div>
        </CRTEffect>
        <CRTEffect intensity="medium" animated={false} className="h-20 rounded border border-primary/20 bg-primary/10">
          <div className="flex h-full items-center justify-center font-mono text-xs text-primary/70">
            Medium
          </div>
        </CRTEffect>
        <CRTEffect intensity="heavy" animated={false} className="h-20 rounded border border-primary/20 bg-primary/10">
          <div className="flex h-full items-center justify-center font-mono text-xs text-primary/70">
            Heavy
          </div>
        </CRTEffect>
      </div>
    </div>
  );
});

// New Cinematic UI Previews

export const AnomalyBannerPreview = React.memo(function AnomalyBannerPreview() {
  return (
    <div className="space-y-4">
      <AnomalyBanner title="ANOMALY FOUND" subtitle="SECTOR 7G" />
      <AnomalyBanner title="ALERT" subtitle="SYSTEM WARNING" animated={false} />
    </div>
  );
});

export const HUDCornerFramePreview = React.memo(function HUDCornerFramePreview() {
  return (
    <div className="relative h-[200px] w-full border border-border/30 bg-card/50">
      <HUDCornerFrame position="top-left" size={40} />
      <HUDCornerFrame position="top-right" size={40} />
      <HUDCornerFrame position="bottom-left" size={40} />
      <HUDCornerFrame position="bottom-right" size={40} />
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-sm text-foreground/80">HUD Corner Frames</span>
      </div>
    </div>
  );
});

export const VideoProgressPreview = React.memo(function VideoProgressPreview() {
  return (
    <div className="space-y-6">
      <VideoProgress
        currentTime="01:23:45"
        endTime="02:15:30"
        progress={58}
        markers={[{ position: 25 }, { position: 75 }]}
      />
      <VideoProgress
        currentTime="00:05:30"
        endTime="00:10:00"
        progress={30}
      />
    </div>
  );
});

export const FloatingPanelPreview = React.memo(function FloatingPanelPreview() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      <FloatingPanel
        title="SYSTEM STATUS"
        subtitle="DIAGNOSTIC"
        data={[
          { label: "CPU", value: "87%" },
          { label: "MEMORY", value: "4.2GB" },
          { label: "UPTIME", value: "12:34:56" },
        ]}
      />
      <FloatingPanel
        title="TARGET DATA"
        position="right"
        data={[
          { label: "ID", value: "TRN-7829" },
          { label: "STATUS", value: "ACTIVE" },
        ]}
      />
    </div>
  );
});

export const GridScanOverlayPreview = React.memo(function GridScanOverlayPreview() {
  return (
    <div className="relative h-[250px] w-full overflow-hidden rounded-lg border border-primary/30 bg-background">
      <GridScanOverlay gridSize={80} scanSpeed={6} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="rounded border border-primary/50 bg-background/80 px-4 py-2 font-mono text-sm text-primary">
          Grid Scan Overlay Effect
        </span>
      </div>
    </div>
  );
});

export const LocationDisplayPreview = React.memo(function LocationDisplayPreview() {
  return (
    <div className="space-y-4">
      <LocationDisplay
        sector="SECTOR 7G"
        grid="GRID 12-A"
        coordinates="X: 847.23 Y: 129.45"
        status="ACTIVE"
      />
      <LocationDisplay
        sector="SECTOR 4B"
        grid="GRID 08-C"
        coordinates="X: 234.56 Y: 789.01"
        status="SCANNING"
      />
    </div>
  );
});

export const UplinkHeaderPreview = React.memo(function UplinkHeaderPreview() {
  return (
    <div className="space-y-4">
      <UplinkHeader
        leftText="UPLINK: ORBITAL RELAY CHANNEL 27A"
        rightText="RADAR CROSS SECTION"
        variant="cyan"
      />
      <UplinkHeader
        leftText="STATUS: ONLINE"
        rightText="LATENCY: 12MS"
        variant="amber"
      />
      <UplinkHeader
        leftText="SECURE CONNECTION"
        variant="green"
      />
    </div>
  );
});

export const ArrivalPanelPreview = React.memo(function ArrivalPanelPreview() {
  return (
    <div className="space-y-4">
      <ArrivalPanel
        title="EVE KIM ARRIVAL"
        subtitle="INCOMING"
        time="00:38"
        unit="MINUTES"
      />
      <ArrivalPanel
        title="SYSTEM REBOOT"
        time="02:15"
        unit="HOURS"
      />
    </div>
  );
});

export const BeamMarkerPreview = React.memo(function BeamMarkerPreview() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-8 py-4">
      <BeamMarker
        label="ARES"
        sublabel="ACTIVE"
        beamColor="red"
        coordinates="34.0522° N"
      />
      <BeamMarker
        label="TRON"
        sublabel="STANDBY"
        beamColor="cyan"
        coordinates="118.2437° W"
      />
      <BeamMarker
        label="EVE"
        beamColor="amber"
      />
    </div>
  );
});

export const TimelineBarPreview = React.memo(function TimelineBarPreview() {
  return (
    <div className="space-y-8">
      <TimelineBar
        markers={[
          { id: "A", position: 10, active: true },
          { id: "B", position: 35 },
          { id: "C", position: 60, active: true },
          { id: "D", position: 85 },
        ]}
        progress={45}
        leftLabel="START"
        rightLabel="END"
      />
      <TimelineBar
        markers={[
          { id: "1", position: 25 },
          { id: "2", position: 50 },
          { id: "3", position: 75 },
        ]}
        progress={70}
        leftLabel="00:00"
        rightLabel="10:00"
      />
    </div>
  );
});

export const LightCycleGamePreview = React.memo(function LightCycleGamePreview() {
  const LightCycleGame = React.lazy(() =>
    import("@/components/thegridcn/light-cycle-game").then((mod) => ({
      default: mod.LightCycleGame,
    }))
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <React.Suspense
        fallback={
          <div className="flex h-[400px] w-[400px] items-center justify-center border border-primary/20 bg-background font-mono text-xs text-primary/50">
            LOADING ARENA...
          </div>
        }
      >
        <LightCycleGame autoPlay width={400} height={400} />
      </React.Suspense>
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
        AI VS AI DEMO
      </span>
    </div>
  );
});

// Interactive UI Previews

export const TerminalPreview = React.memo(function TerminalPreview() {
  return (
    <div className="space-y-4">
      <Terminal
        title="SYSTEM CONSOLE"
        lines={[
          { text: "INITIALIZING GRID SYSTEM...", type: "system" },
          { text: "grid --status", type: "input" },
          { text: "All sectors operational", type: "output" },
          { text: "scan --sector 7G", type: "input" },
          { text: "ANOMALY DETECTED IN SECTOR 7G", type: "error" },
          { text: "ALERT: Dispatching security protocol", type: "system" },
        ]}
      />
    </div>
  );
});

export const EnergyMeterPreview = React.memo(function EnergyMeterPreview() {
  return (
    <div className="space-y-4">
      <EnergyMeter value={85} label="POWER CORE" showValue />
      <EnergyMeter value={45} label="SHIELD MATRIX" showValue />
      <EnergyMeter value={15} label="FUEL RESERVES" showValue />
    </div>
  );
});

export const ProgressRingPreview = React.memo(function ProgressRingPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <ProgressRing value={78} size="md" label="UPLOAD" />
      <ProgressRing value={45} size="md" label="SCAN" variant="warning" />
      <ProgressRing value={92} size="md" label="SYNC" variant="success" />
      <ProgressRing value={23} size="md" label="SHIELD" variant="danger" />
    </div>
  );
});

export const DiagnosticsPanelPreview = React.memo(function DiagnosticsPanelPreview() {
  return (
    <div className="space-y-4">
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
  );
});

export const IdentityDiscPreview = React.memo(function IdentityDiscPreview() {
  return (
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
    </div>
  );
});

// Dashboard & Monitoring Previews

export const GaugePreview = React.memo(function GaugePreview() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      <Gauge value={72} label="SPEED" unit="KM/H" size="md" />
      <Gauge value={45} label="TEMP" unit="°C" size="md" variant="warning" />
      <Gauge value={92} label="LOAD" unit="%" size="md" variant="danger" />
    </div>
  );
});

export const WaveformPreview = React.memo(function WaveformPreview() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const oscillatorsRef = React.useRef<OscillatorNode[]>([]);

  function toggleAudio() {
    if (isPlaying) {
      oscillatorsRef.current.forEach((o) => { try { o.stop() } catch {} });
      oscillatorsRef.current = [];
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      setIsPlaying(false);
      return;
    }

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Tron-like synth: layered detuned saws + filter
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.08;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 600;
    filter.Q.value = 8;
    masterGain.connect(filter).connect(ctx.destination);

    // LFO on filter
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.3;
    lfoGain.gain.value = 400;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    const freqs = [55, 55.5, 110, 82.41];
    const oscs = freqs.map((f) => {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = f;
      osc.connect(masterGain);
      osc.start();
      return osc;
    });

    oscillatorsRef.current = [...oscs, lfo];
    setIsPlaying(true);
  }

  React.useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((o) => { try { o.stop() } catch {} });
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <div className="space-y-4">
      <Waveform label="AUDIO FEED" bars={32} playing={isPlaying} intensity="high" />
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={toggleAudio}
          className="rounded border border-primary/50 bg-primary/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
        >
          {isPlaying ? "■ STOP" : "▶ PLAY SYNTH"}
        </button>
      </div>
      <Waveform label="SIGNAL MONITOR" bars={24} playing variant="warning" intensity="low" />
    </div>
  );
});

export const DataStreamPreview = React.memo(function DataStreamPreview() {
  return (
    <div className="space-y-4">
      <DataStream
        title="SYSTEM LOG"
        entries={[
          { timestamp: "12:00:01", text: "Connection established", type: "success" },
          { timestamp: "12:00:03", text: "Scanning sector 7G...", type: "info" },
          { timestamp: "12:00:05", text: "Anomaly signature detected", type: "warning" },
          { timestamp: "12:00:07", text: "Firewall breach attempt blocked", type: "error" },
          { timestamp: "12:00:09", text: "Diagnostic cycle complete", type: "success" },
          { timestamp: "12:00:11", text: "Uploading telemetry data...", type: "info" },
        ]}
      />
    </div>
  );
});

export const BootSequencePreview = React.memo(function BootSequencePreview() {
  return (
    <div className="space-y-4">
      <BootSequence
        title="GRID INITIALIZATION"
        steps={[
          { label: "Loading kernel modules", duration: 500 },
          { label: "Initializing network stack", duration: 700 },
          { label: "Mounting grid filesystem", duration: 400 },
          { label: "Starting security protocols", duration: 600 },
          { label: "System ready", duration: 300 },
        ]}
      />
    </div>
  );
});

export const SignalIndicatorPreview = React.memo(function SignalIndicatorPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <SignalIndicator strength={90} label="UPLINK" showValue />
      <SignalIndicator strength={45} label="RELAY" showValue />
      <SignalIndicator strength={10} label="BEACON" showValue />
      <SignalIndicator strength={0} label="LOST" />
    </div>
  );
});

export const NotificationPreview = React.memo(function NotificationPreview() {
  return (
    <div className="space-y-3">
      <Notification
        title="System Update"
        description="Grid firmware v2.7.1 is available for download."
        variant="info"
        timestamp="12:34"
      />
      <Notification
        title="Scan Complete"
        description="All sectors clear. No anomalies detected."
        variant="success"
        timestamp="12:35"
      />
      <Notification
        title="High Energy Usage"
        description="Power core operating at 89% capacity."
        variant="warning"
        timestamp="12:36"
      />
      <Notification
        title="Connection Lost"
        description="Relay node 7G is unreachable."
        variant="error"
        timestamp="12:37"
      />
    </div>
  );
});

export const StepperPreview = React.memo(function StepperPreview() {
  return (
    <div className="space-y-6">
      <Stepper
        currentStep={2}
        steps={[
          { label: "Initialize", description: "Boot core systems" },
          { label: "Authenticate", description: "Verify identity disc" },
          { label: "Connect", description: "Establish grid link" },
          { label: "Deploy", description: "Launch program" },
        ]}
      />
    </div>
  );
});

export const TagPreview = React.memo(function TagPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Tag variant="default" glow>PROGRAM</Tag>
      <Tag variant="success" glow>ACTIVE</Tag>
      <Tag variant="warning">STANDBY</Tag>
      <Tag variant="danger" glow>DEREZZED</Tag>
      <Tag variant="outline">ARCHIVED</Tag>
      <Tag variant="default" size="md" glow>SECTOR 7G</Tag>
    </div>
  );
});

// Landing Page & Dashboard Previews

export const StatCardPreview = React.memo(function StatCardPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="TOTAL USERS"
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
        title="UPTIME"
        value="99.97"
        unit="%"
        trend="neutral"
        trendValue="STABLE"
      />
    </div>
  );
});

export const SparklinePreview = React.memo(function SparklinePreview() {
  return (
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
  );
});

export const FeatureCardPreview = React.memo(function FeatureCardPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <FeatureCard
        icon={<span className="text-lg">◈</span>}
        title="Grid Architecture"
        description="Distributed processing across all sectors with real-time synchronization."
      />
      <FeatureCard
        icon={<span className="text-lg">⬡</span>}
        title="Identity Protocols"
        description="Disc-based authentication with multi-layer encryption."
        variant="highlight"
      />
      <FeatureCard
        icon={<span className="text-lg">△</span>}
        title="Derez Protection"
        description="Automated threat response with sub-millisecond intervention."
      />
    </div>
  );
});

export const PricingCardPreview = React.memo(function PricingCardPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <PricingCard
        title="BASIC"
        price="$0"
        period="/mo"
        description="For individual programs"
        features={[
          { text: "5 Grid sectors", included: true },
          { text: "Basic diagnostics", included: true },
          { text: "Community support", included: true },
          { text: "Priority relay", included: false },
          { text: "Custom protocols", included: false },
        ]}
      />
      <PricingCard
        title="PRO"
        price="$29"
        period="/mo"
        description="For advanced operations"
        highlighted
        badge="POPULAR"
        features={[
          { text: "Unlimited sectors", included: true },
          { text: "Full diagnostics", included: true },
          { text: "Priority support", included: true },
          { text: "Priority relay", included: true },
          { text: "Custom protocols", included: false },
        ]}
      />
      <PricingCard
        title="SYSTEM"
        price="$99"
        period="/mo"
        description="Full grid access"
        features={[
          { text: "Unlimited sectors", included: true },
          { text: "Full diagnostics", included: true },
          { text: "Dedicated support", included: true },
          { text: "Priority relay", included: true },
          { text: "Custom protocols", included: true },
        ]}
      />
    </div>
  );
});

export const TestimonialCardPreview = React.memo(function TestimonialCardPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TestimonialCard
        quote="The Grid architecture transformed our entire infrastructure. Response times dropped by 60% across all sectors."
        author="Ajay Singh"
        role="CTO, ENCOM"
        rating={5}
      />
      <TestimonialCard
        quote="Identity disc protocols are the most secure authentication we've deployed. Zero breaches since implementation."
        author="Eve Kim"
        role="Security Lead"
        rating={4}
      />
    </div>
  );
});

export const StatsCounterPreview = React.memo(function StatsCounterPreview() {
  return (
    <StatsCounter
      columns={4}
      items={[
        { value: 12847, label: "ACTIVE USERS" },
        { value: 99, suffix: "%", label: "UPTIME" },
        { value: 42, suffix: "ms", label: "AVG LATENCY" },
        { value: 847, prefix: "", label: "GRID SECTORS" },
      ]}
    />
  );
});

export const CTABannerPreview = React.memo(function CTABannerPreview() {
  return (
    <div className="space-y-4">
      <CTABanner
        title="ENTER THE GRID"
        description="Join thousands of programs already running on the most advanced distributed architecture."
        primaryAction={{ label: "GET STARTED" }}
        secondaryAction={{ label: "VIEW DOCS" }}
        variant="highlight"
      />
    </div>
  );
});

export const HeatmapPreview = React.memo(function HeatmapPreview() {
  return (
    <Heatmap
      label="GRID ACTIVITY (7 DAYS)"
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
  );
});

// Marketing & Product Previews

export const LogoCloudPreview = React.memo(function LogoCloudPreview() {
  return (
    <LogoCloud
      label="TRUSTED BY LEADING PROGRAMS"
      logos={[
        { name: "ENCOM", icon: <span>◈</span> },
        { name: "GRID SYSTEMS", icon: <span>⬡</span> },
        { name: "FLYNN LABS", icon: <span>△</span> },
        { name: "DISC CORP", icon: <span>◇</span> },
        { name: "SECTOR 7G", icon: <span>⬢</span> },
        { name: "TRON LEGACY", icon: <span>◆</span> },
      ]}
    />
  );
});

export const ComparisonTablePreview = React.memo(function ComparisonTablePreview() {
  return (
    <ComparisonTable
      label="FEATURE COMPARISON"
      columns={[
        { name: "Basic" },
        { name: "Pro", highlighted: true },
        { name: "System" },
      ]}
      features={[
        { name: "Grid Sectors", values: ["5", "Unlimited", "Unlimited"] },
        { name: "Diagnostics", values: [true, true, true] },
        { name: "Priority Relay", values: [false, true, true] },
        { name: "Custom Protocols", values: [false, false, true] },
        { name: "Dedicated Support", values: [false, false, true] },
        { name: "API Access", values: ["100/day", "10K/day", "Unlimited"] },
      ]}
    />
  );
});

export const ChangelogPreview = React.memo(function ChangelogPreview() {
  return (
    <Changelog
      label="RELEASE HISTORY"
      entries={[
        {
          version: "2.7.1",
          date: "2026-02-28",
          title: "Grid Scan Performance Boost",
          description: "Optimized sector scanning to reduce latency by 40%.",
          type: "improvement",
        },
        {
          version: "2.7.0",
          date: "2026-02-20",
          title: "Identity Disc 2FA",
          description: "Two-factor authentication via disc biometrics.",
          type: "feature",
        },
        {
          version: "2.6.4",
          date: "2026-02-15",
          title: "Fixed Relay Node Timeout",
          description: "Resolved intermittent connection drops on node 7G.",
          type: "fix",
        },
        {
          version: "2.6.0",
          date: "2026-02-01",
          title: "API v2 Migration",
          description: "v1 endpoints deprecated. Migration guide available.",
          type: "breaking",
        },
      ]}
    />
  );
});

export const ProgressBarPreview = React.memo(function ProgressBarPreview() {
  return (
    <div className="space-y-5">
      <ProgressBar value={78} label="UPLOAD" showValue variant="default" />
      <ProgressBar value={45} label="SCAN" showValue variant="warning" striped />
      <ProgressBar value={92} label="SYNC" showValue variant="success" size="lg" />
      <ProgressBar value={23} label="SHIELD" showValue variant="danger" size="sm" />
    </div>
  );
});

export const AvatarGroupPreview = React.memo(function AvatarGroupPreview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <AvatarGroup
        size="lg"
        users={[
          { name: "Ares", status: "online" },
          { name: "Eve Kim", status: "online" },
          { name: "Ajay Singh", status: "away" },
          { name: "Tron", status: "online" },
          { name: "Clu", status: "offline" },
          { name: "Quorra", status: "online" },
          { name: "Flynn", status: "away" },
        ]}
        max={5}
      />
      <AvatarGroup
        size="sm"
        users={[
          { name: "Alpha", status: "online" },
          { name: "Beta", status: "online" },
          { name: "Gamma", status: "offline" },
        ]}
      />
    </div>
  );
});

export const BentoGridPreview = React.memo(function BentoGridPreview() {
  return (
    <BentoGrid
      columns={3}
      items={[
        {
          title: "Grid Architecture",
          description: "Distributed processing across all sectors with real-time sync.",
          icon: <span>◈</span>,
          span: "2x1",
          variant: "highlight",
        },
        {
          title: "Identity Disc",
          description: "Biometric authentication layer.",
          icon: <span>⬡</span>,
        },
        {
          title: "Derez Shield",
          description: "Automated threat response.",
          icon: <span>△</span>,
        },
        {
          title: "Sector Monitor",
          description: "Real-time grid activity dashboard with alerting.",
          icon: <span>◇</span>,
          span: "2x1",
        },
      ]}
    />
  );
});

export const MarqueePreview = React.memo(function MarqueePreview() {
  return (
    <div className="space-y-4">
      <Marquee speed="normal">
        {["SYSTEM ONLINE", "ALL SECTORS CLEAR", "GRID STABLE", "UPLINK ACTIVE", "DIAGNOSTICS PASSED"].map((text, i) => (
          <span key={i} className="shrink-0 font-mono text-xs uppercase tracking-widest text-primary/70">
            ◆ {text}
          </span>
        ))}
      </Marquee>
      <Marquee speed="slow" direction="right" variant="subtle">
        {["ENCOM", "GRID SYSTEMS", "FLYNN LABS", "SECTOR 7G", "DISC CORP"].map((text, i) => (
          <span key={i} className="shrink-0 rounded border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            {text}
          </span>
        ))}
      </Marquee>
    </div>
  );
});

export const DividerPreview = React.memo(function DividerPreview() {
  return (
    <div className="space-y-6">
      <Divider variant="default" />
      <Divider variant="glow" label="SECTION" />
      <Divider variant="dashed" label="OR" />
      <Divider variant="circuit" label="CONNECTED" />
    </div>
  );
});

export const tronMoviePreviews: Record<string, React.ComponentType> = {
  // Data Display
  "data-card": DataCardPreview,
  "status-bar": StatusBarPreview,
  "video-player": VideoPlayerPreview,
  // Timers
  "timer": TimerPreview,
  "countdown": CountdownPreview,
  "derez-timer": DerezTimerPreview,
  // HUD Elements
  "reticle": ReticlePreview,
  "hud-frame": HUDFramePreview,
  "stat": StatPreview,
  "speed-indicator": SpeedIndicatorPreview,
  "regen-indicator": RegenIndicatorPreview,
  "radar": RadarPreview,
  // Feedback
  "alert-banner": AlertBannerPreview,
  // 3D Components
  "grid-3d": Grid3DPreview,
  "tunnel": TunnelPreview,
  "god-avatar": GodAvatarPreview,
  // Effects
  "circuit-background": CircuitBackgroundPreview,
  "glow-container": GlowContainerPreview,
  "crt-effect": CRTEffectPreview,
  // Cinematic UI
  "anomaly-banner": AnomalyBannerPreview,
  "hud-corner-frame": HUDCornerFramePreview,
  "video-progress": VideoProgressPreview,
  "floating-panel": FloatingPanelPreview,
  "grid-scan-overlay": GridScanOverlayPreview,
  "location-display": LocationDisplayPreview,
  "uplink-header": UplinkHeaderPreview,
  "arrival-panel": ArrivalPanelPreview,
  "beam-marker": BeamMarkerPreview,
  "timeline-bar": TimelineBarPreview,
  // Interactive UI
  "terminal": TerminalPreview,
  "energy-meter": EnergyMeterPreview,
  "progress-ring": ProgressRingPreview,
  "diagnostics-panel": DiagnosticsPanelPreview,
  "identity-disc": IdentityDiscPreview,
  // Dashboard & Monitoring
  "gauge": GaugePreview,
  "waveform": WaveformPreview,
  "data-stream": DataStreamPreview,
  "boot-sequence": BootSequencePreview,
  "signal-indicator": SignalIndicatorPreview,
  "notification": NotificationPreview,
  "stepper": StepperPreview,
  "tag": TagPreview,
  // Landing Page & Dashboard
  "stat-card": StatCardPreview,
  "sparkline": SparklinePreview,
  "feature-card": FeatureCardPreview,
  "pricing-card": PricingCardPreview,
  "testimonial-card": TestimonialCardPreview,
  "stats-counter": StatsCounterPreview,
  "cta-banner": CTABannerPreview,
  "heatmap": HeatmapPreview,
  // Marketing & Product
  "logo-cloud": LogoCloudPreview,
  "comparison-table": ComparisonTablePreview,
  "changelog": ChangelogPreview,
  "progress-bar": ProgressBarPreview,
  "avatar-group": AvatarGroupPreview,
  "bento-grid": BentoGridPreview,
  "marquee": MarqueePreview,
  "divider": DividerPreview,
  // Game
  "light-cycle-game": LightCycleGamePreview,
};
