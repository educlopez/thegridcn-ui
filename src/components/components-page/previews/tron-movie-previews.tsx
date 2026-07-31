"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import {
  ActivityFeed,
  AgentAvatar,
  AlertBanner,
  AnnouncementBar,
  AnomalyBanner,
  ArrivalPanel,
  AvatarGroup,
  Badge,
  BeamMarker,
  BentoGrid,
  BootSequence,
  BreadcrumbNav,
  Changelog,
  Chip,
  CircuitBackground,
  CommandMenu,
  ComparisonTable,
  CopyButton,
  Countdown,
  CRTEffect,
  CTABanner,
  DataCard,
  DataStream,
  DataTable,
  DatePicker,
  DerezTimer,
  DiagnosticsPanel,
  Divider,
  Dropdown,
  EmptyState,
  EnergyMeter,
  FAQ,
  FeatureCard,
  FileUpload,
  FloatingPanel,
  Footer,
  Gauge,
  GlowContainer,
  GridScanOverlay,
  Heatmap,
  HeroSection,
  HUDCornerFrame,
  HUDFrame,
  IdentityDisc,
  InstallCommand,
  KanbanBoard,
  LocationDisplay,
  LogoCloud,
  Marquee,
  MetricRow,
  Modal,
  ModalButton,
  NewsletterForm,
  Notification,
  NumberInput,
  Pagination,
  PricingCard,
  ProgressBar,
  ProgressRing,
  Radar,
  Rating,
  RegenIndicator,
  Reticle,
  SearchInput,
  Select,
  SidebarNav,
  SignalIndicator,
  Skeleton,
  Slider,
  Sparkline,
  SpeedIndicator,
  Stat,
  StatCard,
  StatsCounter,
  StatusBar,
  StatusDot,
  Stepper,
  Tabs,
  Tag,
  TagInput,
  Terminal,
  TestimonialCard,
  TextInput,
  Timeline,
  TimelineBar,
  Timer,
  ToastDemo,
  Toggle,
  Tooltip,
  TronAccordion,
  TronCard,
  TronCardContent,
  TronCardDescription,
  TronCardFooter,
  TronCardHeader,
  TronCardTitle,
  TronCarousel,
  TronCodeBlock,
  TronDrawer,
  TronDrawerContent,
  TronDrawerDescription,
  TronDrawerHeader,
  TronDrawerTitle,
  TronDrawerTrigger,
  TronPopover,
  TronPopoverContent,
  TronPopoverTrigger,
  UplinkHeader,
  VideoPlayer,
  VideoProgress,
  Waveform,
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
  () =>
    import("@/components/website/god-avatar").then((mod) => mod.GodAvatar3D),
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
            highlight: true,
            label: "DOB",
            value: "02 MAY 1985 [DAVIS, CA, USA]",
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
          <Stat label="ACCEL" value={2.76} unit="G" direction="neutral" />
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

export const SpeedIndicatorPreview = React.memo(
  function SpeedIndicatorPreview() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <SpeedIndicator speed={160} />
          <SpeedIndicator speed={85} />
          <SpeedIndicator speed={240} />
        </div>
      </div>
    );
  }
);

export const RegenIndicatorPreview = React.memo(
  function RegenIndicatorPreview() {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <RegenIndicator />
        </div>
      </div>
    );
  }
);

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
      <Grid3D
        className="h-full w-full"
        enableParticles
        enableBeams
        cameraAnimation
      />
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
        <span className="font-mono text-foreground/80 text-xs">ARES</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <GodAvatar3D themeId="tron" color="#00d4ff" size={100} />
        <span className="font-mono text-foreground/80 text-xs">TRON</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <GodAvatar3D themeId="clu" color="#ff6600" size={100} />
        <span className="font-mono text-foreground/80 text-xs">CLU</span>
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

export const CircuitBackgroundPreview = React.memo(
  function CircuitBackgroundPreview() {
    return (
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg border border-primary/30">
        <CircuitBackground className="h-full w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded border border-primary/50 bg-background/80 px-4 py-2 font-mono text-primary text-sm">
            Circuit Background Effect
          </span>
        </div>
      </div>
    );
  }
);

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
          <div className="font-bold font-display text-2xl text-primary tracking-wider">
            CRT MONITOR EFFECT
          </div>
          <div className="font-mono text-foreground/80 text-xs">
            [ SCANLINES + VIGNETTE + SWEEP ]
          </div>
        </div>
      </CRTEffect>

      {/* Intensity comparison */}
      <div className="grid grid-cols-3 gap-2">
        <CRTEffect
          intensity="light"
          animated={false}
          className="h-20 rounded border border-primary/20 bg-primary/10"
        >
          <div className="flex h-full items-center justify-center font-mono text-primary/70 text-xs">
            Light
          </div>
        </CRTEffect>
        <CRTEffect
          intensity="medium"
          animated={false}
          className="h-20 rounded border border-primary/20 bg-primary/10"
        >
          <div className="flex h-full items-center justify-center font-mono text-primary/70 text-xs">
            Medium
          </div>
        </CRTEffect>
        <CRTEffect
          intensity="heavy"
          animated={false}
          className="h-20 rounded border border-primary/20 bg-primary/10"
        >
          <div className="flex h-full items-center justify-center font-mono text-primary/70 text-xs">
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

export const HUDCornerFramePreview = React.memo(
  function HUDCornerFramePreview() {
    return (
      <div className="relative h-[200px] w-full border border-border/30 bg-card/50">
        <HUDCornerFrame position="top-left" size={40} />
        <HUDCornerFrame position="top-right" size={40} />
        <HUDCornerFrame position="bottom-left" size={40} />
        <HUDCornerFrame position="bottom-right" size={40} />
        <div className="flex h-full items-center justify-center">
          <span className="font-mono text-foreground/80 text-sm">
            HUD Corner Frames
          </span>
        </div>
      </div>
    );
  }
);

export const VideoProgressPreview = React.memo(function VideoProgressPreview() {
  return (
    <div className="space-y-6">
      <VideoProgress
        currentTime="01:23:45"
        endTime="02:15:30"
        progress={58}
        markers={[{ position: 25 }, { position: 75 }]}
      />
      <VideoProgress currentTime="00:05:30" endTime="00:10:00" progress={30} />
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

export const GridScanOverlayPreview = React.memo(
  function GridScanOverlayPreview() {
    return (
      <div className="relative h-[250px] w-full overflow-hidden rounded-lg border border-primary/30 bg-background">
        <GridScanOverlay gridSize={80} scanSpeed={6} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded border border-primary/50 bg-background/80 px-4 py-2 font-mono text-primary text-sm">
            Grid Scan Overlay Effect
          </span>
        </div>
      </div>
    );
  }
);

export const LocationDisplayPreview = React.memo(
  function LocationDisplayPreview() {
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
  }
);

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
      <UplinkHeader leftText="SECURE CONNECTION" variant="green" />
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
      <ArrivalPanel title="SYSTEM REBOOT" time="02:15" unit="HOURS" />
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
      <BeamMarker label="EVE" beamColor="amber" />
    </div>
  );
});

export const TimelineBarPreview = React.memo(function TimelineBarPreview() {
  return (
    <div className="space-y-8">
      <TimelineBar
        markers={[
          { active: true, id: "A", position: 10 },
          { id: "B", position: 35 },
          { active: true, id: "C", position: 60 },
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

export const LightCycleGamePreview = React.memo(
  function LightCycleGamePreview() {
    const LightCycleGame = React.lazy(() =>
      import("@/components/thegridcn/light-cycle-game").then((mod) => ({
        default: mod.LightCycleGame,
      }))
    );

    return (
      <div className="flex flex-col items-center gap-2">
        <React.Suspense
          fallback={
            <div className="flex h-[400px] w-[400px] items-center justify-center border border-primary/20 bg-background font-mono text-primary/50 text-xs">
              LOADING ARENA...
            </div>
          }
        >
          <LightCycleGame autoPlay width={400} height={400} />
        </React.Suspense>
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
          AI VS AI DEMO
        </span>
      </div>
    );
  }
);

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

export const DiagnosticsPanelPreview = React.memo(
  function DiagnosticsPanelPreview() {
    return (
      <div className="space-y-4">
        <DiagnosticsPanel
          title="SYSTEM HEALTH"
          status="online"
          metrics={[
            { label: "CPU", value: 67 },
            { label: "MEMORY", status: "warning", value: 82 },
            { label: "DISK I/O", value: 34 },
            { label: "NETWORK", status: "critical", value: 91 },
          ]}
        />
      </div>
    );
  }
);

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
      oscillatorsRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {}
      });
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

  React.useEffect(
    () => () => {
      oscillatorsRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {}
      });
      audioCtxRef.current?.close();
    },
    []
  );

  return (
    <div className="space-y-4">
      <Waveform
        label="AUDIO FEED"
        bars={32}
        playing={isPlaying}
        intensity="high"
      />
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={toggleAudio}
          className="rounded border border-primary/50 bg-primary/10 px-4 py-1.5 font-mono text-[10px] text-primary uppercase tracking-widest transition-colors hover:bg-primary/20"
        >
          {isPlaying ? "■ STOP" : "▶ PLAY SYNTH"}
        </button>
      </div>
      <Waveform
        label="SIGNAL MONITOR"
        bars={24}
        playing
        variant="warning"
        intensity="low"
      />
    </div>
  );
});

export const DataStreamPreview = React.memo(function DataStreamPreview() {
  return (
    <div className="space-y-4">
      <DataStream
        title="SYSTEM LOG"
        entries={[
          {
            text: "Connection established",
            timestamp: "12:00:01",
            type: "success",
          },
          {
            text: "Scanning sector 7G...",
            timestamp: "12:00:03",
            type: "info",
          },
          {
            text: "Anomaly signature detected",
            timestamp: "12:00:05",
            type: "warning",
          },
          {
            text: "Firewall breach attempt blocked",
            timestamp: "12:00:07",
            type: "error",
          },
          {
            text: "Diagnostic cycle complete",
            timestamp: "12:00:09",
            type: "success",
          },
          {
            text: "Uploading telemetry data...",
            timestamp: "12:00:11",
            type: "info",
          },
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
          { duration: 500, label: "Loading kernel modules" },
          { duration: 700, label: "Initializing network stack" },
          { duration: 400, label: "Mounting grid filesystem" },
          { duration: 600, label: "Starting security protocols" },
          { duration: 300, label: "System ready" },
        ]}
      />
    </div>
  );
});

export const SignalIndicatorPreview = React.memo(
  function SignalIndicatorPreview() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <SignalIndicator strength={90} label="UPLINK" showValue />
        <SignalIndicator strength={45} label="RELAY" showValue />
        <SignalIndicator strength={10} label="BEACON" showValue />
        <SignalIndicator strength={0} label="LOST" />
      </div>
    );
  }
);

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
          { description: "Boot core systems", label: "Initialize" },
          { description: "Verify identity disc", label: "Authenticate" },
          { description: "Establish grid link", label: "Connect" },
          { description: "Launch program", label: "Deploy" },
        ]}
      />
    </div>
  );
});

export const TagPreview = React.memo(function TagPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Tag variant="default" glow>
        PROGRAM
      </Tag>
      <Tag variant="success" glow>
        ACTIVE
      </Tag>
      <Tag variant="warning">STANDBY</Tag>
      <Tag variant="danger" glow>
        DEREZZED
      </Tag>
      <Tag variant="outline">ARCHIVED</Tag>
      <Tag variant="default" size="md" glow>
        SECTOR 7G
      </Tag>
    </div>
  );
});

// Landing Page & Dashboard Previews

export const StatCardPreview = React.memo(function StatCardPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="TOTAL USERS"
        value={12_847}
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
        <Sparkline
          data={[10, 25, 18, 35, 28, 42, 55, 48, 62]}
          variant="success"
        />
        <span className="text-[9px] text-foreground/40 uppercase tracking-widest">
          GROWTH
        </span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Sparkline
          data={[60, 55, 48, 52, 45, 38, 42, 35, 30]}
          variant="danger"
        />
        <span className="text-[9px] text-foreground/40 uppercase tracking-widest">
          LATENCY
        </span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Sparkline data={[30, 35, 32, 38, 34, 36, 33, 37, 35]} width={150} />
        <span className="text-[9px] text-foreground/40 uppercase tracking-widest">
          STABLE
        </span>
      </div>
    </div>
  );
});

export const FeatureCardPreview = React.memo(function FeatureCardPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <FeatureCard
        icon={
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path d="M2 4h16v12H2z" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M2 10h16M7 4v12M13 4v12"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity="0.5"
            />
            <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.6" />
          </svg>
        }
        title="Grid Architecture"
        description="Distributed processing across all sectors with real-time synchronization."
      />
      <FeatureCard
        icon={
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle
              cx="10"
              cy="10"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="10"
              cy="10"
              r="3"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M10 3v2M10 15v2M3 10h2M15 10h2"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        }
        title="Identity Protocols"
        description="Disc-based authentication with multi-layer encryption."
        variant="highlight"
      />
      <FeatureCard
        icon={
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 2l8 14H2L10 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M10 8v4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="10" cy="14" r="0.8" fill="currentColor" />
          </svg>
        }
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
          { included: true, text: "5 Grid sectors" },
          { included: true, text: "Basic diagnostics" },
          { included: true, text: "Community support" },
          { included: false, text: "Priority relay" },
          { included: false, text: "Custom protocols" },
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
          { included: true, text: "Unlimited sectors" },
          { included: true, text: "Full diagnostics" },
          { included: true, text: "Priority support" },
          { included: true, text: "Priority relay" },
          { included: false, text: "Custom protocols" },
        ]}
      />
      <PricingCard
        title="SYSTEM"
        price="$99"
        period="/mo"
        description="Full grid access"
        features={[
          { included: true, text: "Unlimited sectors" },
          { included: true, text: "Full diagnostics" },
          { included: true, text: "Dedicated support" },
          { included: true, text: "Priority relay" },
          { included: true, text: "Custom protocols" },
        ]}
      />
    </div>
  );
});

export const TestimonialCardPreview = React.memo(
  function TestimonialCardPreview() {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <TestimonialCard
          quote="The Grid architecture transformed our entire infrastructure. Response times dropped by 60% across all sectors."
          author="Ajay Singh"
          rating={5}
        />
        <TestimonialCard
          quote="Identity disc protocols are the most secure authentication we've deployed. Zero breaches since implementation."
          author="Eve Kim"
          rating={4}
        />
      </div>
    );
  }
);

export const StatsCounterPreview = React.memo(function StatsCounterPreview() {
  return (
    <StatsCounter
      columns={4}
      items={[
        { label: "ACTIVE USERS", value: 12_847 },
        { label: "UPTIME", suffix: "%", value: 99 },
        { label: "AVG LATENCY", suffix: "ms", value: 42 },
        { label: "GRID SECTORS", prefix: "", value: 847 },
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
        {
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect
                x="2"
                y="2"
                width="12"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M5 8h6M8 5v6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ),
          name: "ENCOM",
        },
        {
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="8" r="2" fill="currentColor" />
            </svg>
          ),
          name: "GRID SYSTEMS",
        },
        {
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 2l5.5 3v6L8 14 2.5 11V5L8 2z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 5v6M5.5 6.5L8 8l2.5-1.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          ),
          name: "FLYNN LABS",
        },
        {
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="8"
                cy="8"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="8" cy="8" r="0.8" fill="currentColor" />
            </svg>
          ),
          name: "DISC CORP",
        },
        {
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M2 2h12v12H2z" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M2 8h12M8 2v12"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeDasharray="2 2"
              />
              <circle cx="5" cy="5" r="1" fill="currentColor" />
              <circle cx="11" cy="11" r="1" fill="currentColor" />
            </svg>
          ),
          name: "SECTOR 7G",
        },
        {
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 13V3h4l3 4-3 4h3l3-4-3-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          name: "TRON LEGACY",
        },
      ]}
    />
  );
});

export const ComparisonTablePreview = React.memo(
  function ComparisonTablePreview() {
    return (
      <ComparisonTable
        label="FEATURE COMPARISON"
        columns={[
          { name: "Basic" },
          { highlighted: true, name: "Pro" },
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
  }
);

export const ChangelogPreview = React.memo(function ChangelogPreview() {
  return (
    <Changelog
      label="RELEASE HISTORY"
      entries={[
        {
          date: "2026-02-28",
          description: "Optimized sector scanning to reduce latency by 40%.",
          title: "Grid Scan Performance Boost",
          type: "improvement",
          version: "2.7.1",
        },
        {
          date: "2026-02-20",
          description: "Two-factor authentication via disc biometrics.",
          title: "Identity Disc 2FA",
          type: "feature",
          version: "2.7.0",
        },
        {
          date: "2026-02-15",
          description: "Resolved intermittent connection drops on node 7G.",
          title: "Fixed Relay Node Timeout",
          type: "fix",
          version: "2.6.4",
        },
        {
          date: "2026-02-01",
          description: "v1 endpoints deprecated. Migration guide available.",
          title: "API v2 Migration",
          type: "breaking",
          version: "2.6.0",
        },
      ]}
    />
  );
});

export const ProgressBarPreview = React.memo(function ProgressBarPreview() {
  return (
    <div className="space-y-5">
      <ProgressBar value={78} label="UPLOAD" showValue variant="default" />
      <ProgressBar
        value={45}
        label="SCAN"
        showValue
        variant="warning"
        striped
      />
      <ProgressBar
        value={92}
        label="SYNC"
        showValue
        variant="success"
        size="lg"
      />
      <ProgressBar
        value={23}
        label="SHIELD"
        showValue
        variant="danger"
        size="sm"
      />
    </div>
  );
});

export const AvatarGroupPreview = React.memo(function AvatarGroupPreview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <AvatarGroup
        size="lg"
        users={[
          {
            avatar: <AgentAvatar seed="Ares" size={44} hue={200} />,
            name: "Ares",
            status: "online",
          },
          {
            avatar: <AgentAvatar seed="Eve Kim" size={44} hue={30} />,
            name: "Eve Kim",
            status: "online",
          },
          {
            avatar: <AgentAvatar seed="Ajay Singh" size={44} hue={185} />,
            name: "Ajay Singh",
            status: "away",
          },
          {
            avatar: <AgentAvatar seed="Tron" size={44} hue={200} />,
            name: "Tron",
            status: "online",
          },
          {
            avatar: <AgentAvatar seed="Clu" size={44} hue={30} />,
            name: "Clu",
            status: "offline",
          },
          {
            avatar: <AgentAvatar seed="Quorra" size={44} hue={200} />,
            name: "Quorra",
            status: "online",
          },
          {
            avatar: <AgentAvatar seed="Flynn" size={44} hue={185} />,
            name: "Flynn",
            status: "away",
          },
        ]}
        max={5}
      />
      <AvatarGroup
        size="md"
        users={[
          {
            avatar: <AgentAvatar seed="Alpha" size={36} hue={200} />,
            name: "Alpha",
            status: "online",
          },
          {
            avatar: <AgentAvatar seed="Beta" size={36} hue={30} />,
            name: "Beta",
            status: "online",
          },
          {
            avatar: <AgentAvatar seed="Gamma" size={36} hue={185} />,
            name: "Gamma",
            status: "offline",
          },
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
          description:
            "Distributed processing across all sectors with real-time sync.",
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M2 4h12v8H2z" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M2 8h12M6 4v8M10 4v8"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.5"
              />
            </svg>
          ),
          span: "2x1",
          title: "Grid Architecture",
          variant: "highlight",
        },
        {
          description: "Biometric authentication layer.",
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="8"
                cy="8"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="8" cy="8" r="0.8" fill="currentColor" />
            </svg>
          ),
          title: "Identity Disc",
        },
        {
          description: "Automated threat response.",
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 2l5 3v4.5c0 2.5-2.2 4.2-5 5.5-2.8-1.3-5-3-5-5.5V5l5-3z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M6 8l1.5 1.5L11 6"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          title: "Derez Shield",
        },
        {
          description: "Real-time grid activity dashboard with alerting.",
          icon: (
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect
                x="1"
                y="3"
                width="14"
                height="10"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M3 9l2.5-3 2 2L11 5l2 2"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          span: "2x1",
          title: "Sector Monitor",
        },
      ]}
    />
  );
});

export const MarqueePreview = React.memo(function MarqueePreview() {
  return (
    <div className="space-y-4">
      <Marquee speed="normal">
        {[
          "SYSTEM ONLINE",
          "ALL SECTORS CLEAR",
          "GRID STABLE",
          "UPLINK ACTIVE",
          "DIAGNOSTICS PASSED",
        ].map((text, i) => (
          <span
            key={i}
            className="shrink-0 font-mono text-primary/70 text-xs uppercase tracking-widest"
          >
            ◆ {text}
          </span>
        ))}
      </Marquee>
      <Marquee speed="slow" direction="right" variant="subtle">
        {["ENCOM", "GRID SYSTEMS", "FLYNN LABS", "SECTOR 7G", "DISC CORP"].map(
          (text, i) => (
            <span
              key={i}
              className="shrink-0 rounded border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-[10px] text-foreground/50 uppercase tracking-widest"
            >
              {text}
            </span>
          )
        )}
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

// Essential UI Previews

export const FAQPreview = React.memo(function FAQPreview() {
  return (
    <FAQ
      label="FREQUENTLY ASKED QUESTIONS"
      items={[
        {
          answer:
            "The Grid is a distributed digital architecture that enables real-time processing across all connected sectors. It provides the backbone for identity management, resource allocation, and program execution.",
          question: "What is the Grid?",
        },
        {
          answer:
            "Each program is assigned a unique identity disc that stores authentication credentials, access permissions, and activity history. The disc uses biometric encryption for secure verification.",
          question: "How do identity discs work?",
        },
        {
          answer:
            "Deresolution is the process of removing a program from the Grid. All associated resources are reclaimed and the identity disc is archived. This action is irreversible.",
          question: "What happens during deresolution?",
        },
        {
          answer:
            "Contact your Grid administrator to request elevated sector permissions. Upgrades require identity verification and a minimum trust score of 85%.",
          question: "How can I upgrade my sector access?",
        },
      ]}
    />
  );
});

export const TimelinePreview = React.memo(function TimelinePreview() {
  return (
    <Timeline
      label="PRODUCT ROADMAP"
      items={[
        {
          date: "Q1 2025",
          description: "Core infrastructure and identity disc system.",
          status: "completed",
          title: "Grid Architecture v1.0",
        },
        {
          date: "Q2 2025",
          description: "Real-time diagnostics and anomaly detection.",
          status: "completed",
          title: "Sector Monitoring",
        },
        {
          date: "Q3 2025",
          description: "Cross-sector communication with priority routing.",
          status: "active",
          title: "Multi-Region Relay",
        },
        {
          date: "Q4 2025",
          description: "User-defined communication and encryption protocols.",
          status: "upcoming",
          title: "Custom Protocols",
        },
        {
          date: "Q1 2026",
          description: "Autonomous threat response and optimization.",
          status: "upcoming",
          title: "Grid AI Integration",
        },
      ]}
    />
  );
});

export const AnnouncementBarPreview = React.memo(
  function AnnouncementBarPreview() {
    return (
      <div className="space-y-3">
        <AnnouncementBar
          text="Grid v2.7.1 is now available with 40% faster sector scanning."
          action={{ label: "UPDATE NOW" }}
          variant="highlight"
        />
        <AnnouncementBar
          text="Scheduled maintenance on Sector 7G — March 15, 02:00 UTC."
          variant="warning"
        />
        <AnnouncementBar
          text="Welcome to the Grid. Identity disc verification is required."
          variant="default"
          dismissible={false}
        />
      </div>
    );
  }
);

export const DataTablePreview = React.memo(function DataTablePreview() {
  // biome-ignore lint/style/useConsistentTypeDefinitions: a type alias keeps the implicit index signature DataTable needs
  type Row = {
    id: string;
    latency: number;
    name: string;
    sector: string;
    status: string;
  };
  const columns = [
    { key: "id" as const, label: "ID", sortable: true },
    { key: "name" as const, label: "Program", sortable: true },
    { key: "sector" as const, label: "Sector" },
    {
      key: "status" as const,
      label: "Status",
      render: (val: unknown) => (
        <span
          className={
            val === "Active"
              ? "text-green-500"
              : val === "Standby"
                ? "text-amber-500"
                : "text-foreground/30"
          }
        >
          {String(val)}
        </span>
      ),
    },
    {
      align: "right" as const,
      key: "latency" as const,
      label: "Latency",
      render: (val: unknown) => `${val}ms`,
      sortable: true,
    },
  ];
  const data: Row[] = [
    {
      id: "PRG-001",
      latency: 12,
      name: "Ares",
      sector: "7G",
      status: "Active",
    },
    { id: "PRG-002", latency: 8, name: "Tron", sector: "4B", status: "Active" },
    {
      id: "PRG-003",
      latency: 45,
      name: "Clu",
      sector: "1A",
      status: "Standby",
    },
    {
      id: "PRG-004",
      latency: 15,
      name: "Quorra",
      sector: "7G",
      status: "Active",
    },
    {
      id: "PRG-005",
      latency: 0,
      name: "Flynn",
      sector: "9C",
      status: "Offline",
    },
  ];
  return <DataTable label="PROGRAM REGISTRY" columns={columns} data={data} />;
});

export const RatingPreview = React.memo(function RatingPreview() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Rating value={5} max={5} label="SECURITY" size="lg" showValue />
      <Rating
        value={4}
        max={5}
        label="SPEED"
        size="md"
        showValue
        variant="success"
      />
      <Rating
        value={3}
        max={5}
        label="UPTIME"
        size="md"
        showValue
        variant="warning"
      />
      <Rating
        value={1}
        max={5}
        label="RISK"
        size="sm"
        showValue
        variant="danger"
      />
    </div>
  );
});

export const SkeletonPreview = React.memo(function SkeletonPreview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} />
        <div className="flex-1">
          <Skeleton variant="text" lines={2} />
        </div>
      </div>
      <Skeleton variant="rectangular" height={100} />
      <Skeleton variant="card" />
    </div>
  );
});

export const BreadcrumbNavPreview = React.memo(function BreadcrumbNavPreview() {
  return (
    <div className="space-y-4">
      <BreadcrumbNav
        items={[
          { label: "Grid" },
          { label: "Sector 7G" },
          { active: true, label: "Programs" },
        ]}
      />
      <BreadcrumbNav
        separator="slash"
        items={[
          { label: "Dashboard" },
          { label: "Diagnostics" },
          { active: true, label: "CPU" },
        ]}
      />
      <BreadcrumbNav
        separator="dot"
        items={[
          { label: "Home" },
          { label: "Products" },
          { label: "Grid Pro" },
          { active: true, label: "Pricing" },
        ]}
      />
    </div>
  );
});

export const CommandMenuPreview = React.memo(function CommandMenuPreview() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-foreground/60 text-xs transition-colors hover:border-primary/50 hover:text-primary"
      >
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <circle
            cx="6"
            cy="6"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M9.5 9.5L12.5 12.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        Search commands...
        <kbd className="rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[9px] text-foreground/30">
          ⌘K
        </kbd>
      </button>
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        label="GRID COMMAND CENTER"
        items={[
          {
            description: "Full system health check",
            group: "Actions",
            icon: <span>⚡</span>,
            label: "Run Diagnostics",
            shortcut: "⌘D",
          },
          {
            description: "Anomaly detection scan",
            group: "Actions",
            icon: <span>◎</span>,
            label: "Scan Sector",
            shortcut: "⌘S",
          },
          {
            description: "Launch new program instance",
            group: "Actions",
            icon: <span>▶</span>,
            label: "Deploy Program",
          },
          {
            description: "Navigate to sector",
            group: "Navigation",
            icon: <span>→</span>,
            label: "Sector 7G",
          },
          {
            description: "Manage user identities",
            group: "Navigation",
            icon: <span>◇</span>,
            label: "Identity Discs",
          },
          {
            description: "View recent activity",
            group: "Navigation",
            icon: <span>≡</span>,
            label: "System Logs",
          },
        ]}
      />
    </div>
  );
});

export const TabsPreview = React.memo(function TabsPreview() {
  const [tab, setTab] = React.useState("overview");
  return (
    <Tabs
      tabs={[
        { label: "Overview", value: "overview" },
        { label: "Metrics", value: "metrics" },
        { label: "Logs", value: "logs" },
        { disabled: true, label: "Settings", value: "settings" },
      ]}
      value={tab}
      onChange={setTab}
    >
      <div className="rounded border border-primary/15 bg-card/60 p-4">
        <p className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
          {tab === "overview" &&
            "System overview with real-time sector monitoring."}
          {tab === "metrics" && "Performance metrics across all grid sectors."}
          {tab === "logs" && "Recent activity logs and event history."}
        </p>
      </div>
    </Tabs>
  );
});

export const TooltipPreview = React.memo(function TooltipPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      <Tooltip content="SYSTEM STATUS: ONLINE" side="top">
        <button
          type="button"
          className="rounded border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-[10px] text-foreground/60 hover:text-primary"
        >
          Hover top
        </button>
      </Tooltip>
      <Tooltip content="SECTOR 7G ACTIVE" side="bottom">
        <button
          type="button"
          className="rounded border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-[10px] text-foreground/60 hover:text-primary"
        >
          Hover bottom
        </button>
      </Tooltip>
      <Tooltip content="ENCRYPTED CHANNEL" side="right">
        <button
          type="button"
          className="rounded border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-[10px] text-foreground/60 hover:text-primary"
        >
          Hover right
        </button>
      </Tooltip>
    </div>
  );
});

export const ModalPreview = React.memo(function ModalPreview() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-primary text-xs transition-colors hover:bg-primary/20"
      >
        OPEN MODAL
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="CONFIRM ACTION"
        description="This operation requires authorization"
        footer={
          <>
            <ModalButton onClick={() => setOpen(false)}>CANCEL</ModalButton>
            <ModalButton variant="primary" onClick={() => setOpen(false)}>
              CONFIRM
            </ModalButton>
          </>
        }
      >
        <p className="font-mono text-foreground/60 text-xs">
          You are about to initiate a full sector scan. This process cannot be
          interrupted once started.
        </p>
      </Modal>
    </div>
  );
});

export const DropdownPreview = React.memo(function DropdownPreview() {
  return (
    <div className="flex justify-center py-4">
      <Dropdown
        items={[
          { label: "View Profile", shortcut: "⌘P" },
          { label: "Settings", shortcut: "⌘," },
          { label: "System Logs" },
          { label: "", separator: true },
          { label: "Disconnect", variant: "danger" },
        ]}
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-[10px] text-foreground/60 uppercase tracking-widest hover:text-primary"
        >
          Actions
          <svg
            aria-hidden="true"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <path
              d="M2 3l2 2 2-2"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Dropdown>
    </div>
  );
});

export const TogglePreview = React.memo(function TogglePreview() {
  const [a, setA] = React.useState(true);
  const [b, setB] = React.useState(false);
  const [c, setC] = React.useState(true);
  return (
    <div className="flex flex-col items-start gap-4">
      <Toggle checked={a} onChange={setA} label="GRID UPLINK" size="md" />
      <Toggle checked={b} onChange={setB} label="STEALTH MODE" size="md" />
      <Toggle checked={c} onChange={setC} label="AUTO-SCAN" size="sm" />
      <Toggle label="DISABLED" size="md" disabled defaultChecked />
    </div>
  );
});

export const PaginationPreview = React.memo(function PaginationPreview() {
  const [page, setPage] = React.useState(3);
  return (
    <div className="flex justify-center">
      <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
    </div>
  );
});

export const FileUploadPreview = React.memo(function FileUploadPreview() {
  return (
    <FileUpload
      accept=".json,.csv,.txt"
      multiple
      maxSize={5 * 1024 * 1024}
      label="DROP DATA FILES HERE"
      description="JSON, CSV, or TXT — max 5MB"
    />
  );
});

export const KanbanBoardPreview = React.memo(function KanbanBoardPreview() {
  return (
    <KanbanBoard
      title="GRID OPERATIONS"
      columns={[
        {
          cards: [
            {
              description: "Sector 12A needs coverage",
              id: "1",
              tag: "INFRA",
              tagVariant: "default",
              title: "Deploy relay node",
            },
            {
              id: "2",
              tag: "MAINT",
              tagVariant: "warning",
              title: "Update firmware",
            },
          ],
          color: "hsl(var(--primary))",
          id: "queue",
          title: "Queued",
        },
        {
          cards: [
            {
              assignee: "Ares",
              description: "Sector 7G readings",
              id: "3",
              tag: "URGENT",
              tagVariant: "danger",
              title: "Anomaly investigation",
            },
          ],
          color: "#22c55e",
          id: "active",
          title: "In Progress",
        },
        {
          cards: [
            {
              assignee: "Eve",
              id: "4",
              tag: "DONE",
              tagVariant: "success",
              title: "Perimeter scan",
            },
          ],
          color: "#6b7280",
          id: "done",
          title: "Complete",
        },
      ]}
    />
  );
});

export const EmptyStatePreview = React.memo(function EmptyStatePreview() {
  return (
    <EmptyState
      title="NO DATA FOUND"
      description="This sector has no recorded activity. Start a scan to populate data."
      action={{ label: "START SCAN" }}
    />
  );
});

export const BadgePreview = React.memo(function BadgePreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default" dot pulse>
        ACTIVE
      </Badge>
      <Badge variant="success" dot>
        ONLINE
      </Badge>
      <Badge variant="warning" dot>
        STANDBY
      </Badge>
      <Badge variant="danger" dot pulse>
        CRITICAL
      </Badge>
      <Badge variant="outline">ARCHIVED</Badge>
      <Badge variant="default" size="md" dot>
        SECTOR 7G
      </Badge>
    </div>
  );
});

export const ToastPreview = React.memo(function ToastPreview() {
  return <ToastDemo />;
});

export const SliderPreview = React.memo(function SliderPreview() {
  return (
    <div className="space-y-4">
      <Slider defaultValue={72} label="POWER LEVEL" showValue />
      <Slider defaultValue={45} label="SHIELD STRENGTH" showValue />
      <Slider
        defaultValue={15}
        min={0}
        max={100}
        label="SIGNAL BOOST"
        showValue
      />
    </div>
  );
});

export const SelectPreview = React.memo(function SelectPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Select
        label="SECTOR"
        placeholder="Select sector..."
        options={[
          { label: "Sector 7G", value: "7g" },
          { label: "Sector 12A", value: "12a" },
          { label: "Sector 3F", value: "3f" },
          { disabled: true, label: "Sector 9B", value: "9b" },
        ]}
        defaultValue="7g"
      />
      <Select
        label="PRIORITY"
        placeholder="Select priority..."
        options={[
          { label: "Urgent", value: "urgent" },
          { label: "High", value: "high" },
          { label: "Normal", value: "normal" },
          { label: "Low", value: "low" },
        ]}
      />
    </div>
  );
});

export const TextInputPreview = React.memo(function TextInputPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TextInput label="DESIGNATION" placeholder="Enter program name..." />
      <TextInput
        label="ACCESS CODE"
        placeholder="Enter code..."
        error="Invalid authorization code"
      />
      <TextInput
        label="SEARCH"
        placeholder="Search sectors..."
        icon={
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <circle
              cx="5"
              cy="5"
              r="3.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M8 8l2.5 2.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        }
      />
      <TextInput label="DISABLED" placeholder="Locked..." disabled />
    </div>
  );
});

export const NumberInputPreview = React.memo(function NumberInputPreview() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <NumberInput label="SECTORS" defaultValue={7} min={1} max={100} />
      <NumberInput
        label="POWER LEVEL"
        defaultValue={50}
        min={0}
        max={100}
        step={10}
      />
      <NumberInput label="DISABLED" defaultValue={42} disabled />
    </div>
  );
});

export const ChipPreview = React.memo(function ChipPreview() {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(["active", "online"])
  );
  const chips = ["active", "online", "standby", "offline", "derezzed"];
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <Chip
            key={c}
            selected={selected.has(c)}
            onClick={() => {
              const next = new Set(selected);
              if (next.has(c)) {
                next.delete(c);
              } else {
                next.add(c);
              }
              setSelected(next);
            }}
            variant={
              c === "derezzed"
                ? "danger"
                : c === "standby"
                  ? "warning"
                  : c === "online"
                    ? "success"
                    : "default"
            }
            size="md"
          >
            {c}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip selected onRemove={() => {}} size="md">
          SECTOR 7G
        </Chip>
        <Chip selected onRemove={() => {}} size="md" variant="warning">
          PRIORITY: HIGH
        </Chip>
        <Chip selected onRemove={() => {}} size="md" variant="danger">
          ANOMALY
        </Chip>
      </div>
    </div>
  );
});

export const AgentAvatarPreview = React.memo(function AgentAvatarPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <AgentAvatar seed="Ares" size={64} hue={200} />
        <span className="font-mono text-[10px] text-foreground/50 tracking-widest">
          ARES
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AgentAvatar seed="Clu" size={64} hue={30} />
        <span className="font-mono text-[10px] text-foreground/50 tracking-widest">
          CLU
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AgentAvatar seed="Tron" size={64} hue={185} />
        <span className="font-mono text-[10px] text-foreground/50 tracking-widest">
          TRON
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AgentAvatar seed="Eve Kim" size={64} hue={30} />
        <span className="font-mono text-[10px] text-foreground/50 tracking-widest">
          EVE KIM
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AgentAvatar seed="Flynn" size={64} hue={200} />
        <span className="font-mono text-[10px] text-foreground/50 tracking-widest">
          FLYNN
        </span>
      </div>
    </div>
  );
});

// ---------------------------------------------------------------------------
// New Component Previews
// ---------------------------------------------------------------------------

export const CopyButtonPreview = React.memo(function CopyButtonPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <CopyButton
          value="npm install @thegridcn/ui"
          variant="default"
          size="md"
        >
          COPY
        </CopyButton>
        <CopyButton value="pnpm add @thegridcn/ui" variant="ghost" size="md">
          GHOST
        </CopyButton>
        <CopyButton value="yarn add @thegridcn/ui" variant="outline" size="md">
          OUTLINE
        </CopyButton>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <CopyButton value="npx thegridcn init" variant="default" size="sm">
          SM DEFAULT
        </CopyButton>
        <CopyButton value="disabled" variant="default" size="sm" disabled>
          DISABLED
        </CopyButton>
      </div>
    </div>
  );
});

export const TronCodeBlockPreview = React.memo(function TronCodeBlockPreview() {
  const code = `import { DataCard, HUDFrame } from "@thegridcn/ui"

export function Dashboard() {
  return (
    <HUDFrame title="GRID STATUS">
      <DataCard
        title="Active Programs"
        value={2048}
        trend="up"
      />
    </HUDFrame>
  )
}`;

  return (
    <div className="space-y-4">
      <TronCodeBlock code={code} language="tsx" filename="dashboard.tsx" />
    </div>
  );
});

export const StatusDotPreview = React.memo(function StatusDotPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-6">
        <StatusDot status="online" pulse label="Online" size="md" />
        <StatusDot status="offline" label="Offline" size="md" />
        <StatusDot status="busy" pulse label="Busy" size="md" />
        <StatusDot status="away" pulse label="Away" size="md" />
        <StatusDot status="error" pulse label="Error" size="md" />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <StatusDot status="online" pulse size="sm" label="Small" />
        <StatusDot status="online" pulse size="md" label="Medium" />
        <StatusDot status="online" pulse size="lg" label="Large" />
      </div>
    </div>
  );
});

export const HeroSectionPreview = React.memo(function HeroSectionPreview() {
  return (
    <HeroSection
      badge="Now Available"
      subtitle="The Grid Component Network"
      title="Build the Future"
      description="A Tron-inspired component library for building cinematic user interfaces with React and Tailwind CSS."
    >
      <button
        type="button"
        className="rounded border border-primary bg-primary/20 px-6 py-2.5 font-mono text-primary text-xs uppercase tracking-widest shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.2)] transition-all hover:bg-primary/30"
      >
        Enter the Grid
      </button>
      <button
        type="button"
        className="rounded border border-primary/30 px-6 py-2.5 font-mono text-foreground/60 text-xs uppercase tracking-widest transition-all hover:border-primary/50 hover:text-primary"
      >
        Documentation
      </button>
    </HeroSection>
  );
});

export const FooterPreview = React.memo(function FooterPreview() {
  return (
    <Footer
      logo={
        <span className="font-bold font-display text-lg text-primary uppercase tracking-wider">
          TheGridCN
        </span>
      }
      columns={[
        {
          links: [
            { href: "#", label: "Components" },
            { href: "#", label: "Templates" },
            { href: "#", label: "Pricing" },
          ],
          title: "Product",
        },
        {
          links: [
            { href: "#", label: "Documentation" },
            { href: "#", label: "Changelog" },
            { href: "#", label: "Blog" },
          ],
          title: "Resources",
        },
        {
          links: [
            { href: "#", label: "About" },
            { href: "#", label: "Contact" },
            { external: true, href: "#", label: "GitHub" },
          ],
          title: "Company",
        },
      ]}
      socials={[
        {
          href: "#",
          icon: (
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          ),
          label: "GitHub",
        },
        {
          href: "#",
          icon: (
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
          label: "Twitter",
        },
      ]}
      copyright="&copy; 2026 TheGridCN. All rights reserved."
    />
  );
});

export const InstallCommandPreview = React.memo(
  function InstallCommandPreview() {
    return (
      <div className="space-y-4">
        <InstallCommand packageName="@thegridcn/ui" />
        <InstallCommand packageName="@thegridcn/ui" packageManager="pnpm" />
      </div>
    );
  }
);

export const SidebarNavPreview = React.memo(function SidebarNavPreview() {
  const iconGrid = (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <rect
        x="1"
        y="1"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="8"
        y="1"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="1"
        y="8"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="8"
        y="8"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );

  const iconStar = (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M7 1l1.76 3.57L13 5.24l-3 2.92.71 4.13L7 10.27l-3.71 2.02.71-4.13-3-2.92 4.24-.67z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <SidebarNav
      items={[
        { active: true, href: "#", icon: iconGrid, label: "Dashboard" },
        { href: "#", icon: iconStar, label: "Programs" },
        {
          children: [
            { href: "#", label: "Diagnostics" },
            { href: "#", label: "Security" },
            { href: "#", label: "Network" },
          ],
          icon: iconGrid,
          label: "System",
        },
        { href: "#", icon: iconStar, label: "Settings" },
      ]}
    />
  );
});

export const TronAccordionPreview = React.memo(function TronAccordionPreview() {
  return (
    <TronAccordion
      label="Grid Knowledge Base"
      items={[
        {
          content:
            "The Grid is a vast digital frontier created by Kevin Flynn. It is a virtual reality environment where programs live and interact, governed by its own set of rules and physics.",
          trigger: "What is the Grid?",
        },
        {
          content:
            "Isomorphic Algorithms (ISOs) are programs that spontaneously evolved within the Grid. They were considered miraculous by Flynn due to their emergent complexity and potential to revolutionize science and philosophy.",
          trigger: "Who are the ISOs?",
        },
        {
          content:
            "Light Cycles are high-speed vehicles used in the Grid's arena games. They leave solid light trails behind them that act as walls, making them both transportation and weapons in competitive matches.",
          trigger: "What is a Light Cycle?",
        },
      ]}
    />
  );
});

export const TronCarouselPreview = React.memo(function TronCarouselPreview() {
  const slides = [
    <div
      key="1"
      className="flex h-40 items-center justify-center rounded border border-primary/20 bg-primary/5"
    >
      <span className="font-mono text-primary/60 text-sm uppercase tracking-widest">
        Sector 01
      </span>
    </div>,
    <div
      key="2"
      className="flex h-40 items-center justify-center rounded border border-cyan-500/20 bg-cyan-500/5"
    >
      <span className="font-mono text-cyan-500/60 text-sm uppercase tracking-widest">
        Sector 02
      </span>
    </div>,
    <div
      key="3"
      className="flex h-40 items-center justify-center rounded border border-amber-500/20 bg-amber-500/5"
    >
      <span className="font-mono text-amber-500/60 text-sm uppercase tracking-widest">
        Sector 03
      </span>
    </div>,
    <div
      key="4"
      className="flex h-40 items-center justify-center rounded border border-pink-500/20 bg-pink-500/5"
    >
      <span className="font-mono text-pink-500/60 text-sm uppercase tracking-widest">
        Sector 04
      </span>
    </div>,
  ];

  return <TronCarousel items={slides} loop showDots showArrows />;
});

export const TronDrawerPreview = React.memo(function TronDrawerPreview() {
  return (
    <TronDrawer>
      <TronDrawerTrigger>Open System Drawer</TronDrawerTrigger>
      <TronDrawerContent>
        <TronDrawerHeader>
          <TronDrawerTitle>System Configuration</TronDrawerTitle>
          <TronDrawerDescription>
            Adjust core Grid parameters and view system diagnostics.
          </TronDrawerDescription>
        </TronDrawerHeader>
        <div className="space-y-3 px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Grid Resolution
            </span>
            <span className="font-mono text-foreground/80 text-xs">
              4096 x 4096
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Active Programs
            </span>
            <span className="font-mono text-foreground/80 text-xs">2,048</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
              Uptime
            </span>
            <span className="font-mono text-foreground/80 text-xs">
              1,024 cycles
            </span>
          </div>
        </div>
      </TronDrawerContent>
    </TronDrawer>
  );
});

export const TronCardPreview = React.memo(function TronCardPreview() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <TronCard variant="default">
        <TronCardHeader>
          <TronCardTitle>Default</TronCardTitle>
          <TronCardDescription>Standard card variant</TronCardDescription>
        </TronCardHeader>
        <TronCardContent>
          <p className="text-foreground/60 text-xs">
            Base card with subtle glow and blur backdrop.
          </p>
        </TronCardContent>
        <TronCardFooter>
          <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-widest">
            Footer
          </span>
        </TronCardFooter>
      </TronCard>

      <TronCard variant="elevated">
        <TronCardHeader>
          <TronCardTitle>Elevated</TronCardTitle>
          <TronCardDescription>Enhanced prominence</TronCardDescription>
        </TronCardHeader>
        <TronCardContent>
          <p className="text-foreground/60 text-xs">
            Stronger glow and inner highlight for emphasis.
          </p>
        </TronCardContent>
        <TronCardFooter>
          <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-widest">
            Footer
          </span>
        </TronCardFooter>
      </TronCard>

      <TronCard variant="ghost">
        <TronCardHeader>
          <TronCardTitle>Ghost</TronCardTitle>
          <TronCardDescription>Minimal styling</TronCardDescription>
        </TronCardHeader>
        <TronCardContent>
          <p className="text-foreground/60 text-xs">
            Transparent background with faint border.
          </p>
        </TronCardContent>
        <TronCardFooter>
          <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-widest">
            Footer
          </span>
        </TronCardFooter>
      </TronCard>
    </div>
  );
});

export const TronPopoverPreview = React.memo(function TronPopoverPreview() {
  return (
    <div className="flex items-center justify-center py-8">
      <TronPopover>
        <TronPopoverTrigger>
          <button
            type="button"
            className="rounded border border-primary/20 bg-card/60 px-4 py-2 font-mono text-[10px] text-foreground/50 uppercase tracking-widest backdrop-blur-sm transition-all hover:border-primary/40 hover:text-primary"
          >
            View Program Info
          </button>
        </TronPopoverTrigger>
        <TronPopoverContent align="center">
          <div className="space-y-2">
            <h4 className="font-mono text-primary text-xs uppercase tracking-widest">
              Program Details
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between gap-6">
                <span className="font-mono text-[9px] text-foreground/40 uppercase">
                  Name
                </span>
                <span className="font-mono text-[10px] text-foreground/70">
                  TRON-JA-307020
                </span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="font-mono text-[9px] text-foreground/40 uppercase">
                  Status
                </span>
                <span className="font-mono text-[10px] text-green-400">
                  Active
                </span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="font-mono text-[9px] text-foreground/40 uppercase">
                  Cycles
                </span>
                <span className="font-mono text-[10px] text-foreground/70">
                  12,847
                </span>
              </div>
            </div>
          </div>
        </TronPopoverContent>
      </TronPopover>
    </div>
  );
});

export const ActivityFeedPreview = React.memo(function ActivityFeedPreview() {
  return (
    <ActivityFeed
      label="System Activity"
      items={[
        {
          description: "New sector brought online with 512 active nodes.",
          id: "1",
          timestamp: "2 min ago",
          title: "Grid sector 7G initialized",
          type: "success",
          user: "MCP",
        },
        {
          description:
            "Irregular data pattern identified. Running diagnostics.",
          id: "2",
          timestamp: "8 min ago",
          title: "Anomaly detected in sector 4A",
          type: "warning",
          user: "TRON",
        },
        {
          description: "Unauthorized derez blocked by security protocol.",
          id: "3",
          timestamp: "15 min ago",
          title: "Program deresolution attempted",
          type: "error",
          user: "CLU",
        },
        {
          description: "42 ISOs successfully relocated to safe zone.",
          id: "4",
          timestamp: "1 hour ago",
          title: "ISO migration complete",
          type: "info",
          user: "QUORRA",
        },
        {
          id: "5",
          timestamp: "3 hours ago",
          title: "System backup initiated",
          type: "default",
          user: "FLYNN",
        },
      ]}
    />
  );
});

export const MetricRowPreview = React.memo(function MetricRowPreview() {
  return (
    <MetricRow
      columns={4}
      metrics={[
        {
          change: "+12.5%",
          changeType: "up",
          label: "Active Programs",
          value: "2,048",
        },
        {
          change: "+3",
          changeType: "up",
          label: "Grid Sectors",
          value: "128",
        },
        {
          change: "-23%",
          changeType: "down",
          label: "Anomalies",
          value: "7",
        },
        {
          change: "0.0%",
          changeType: "neutral",
          label: "Uptime",
          value: "99.8%",
        },
      ]}
    />
  );
});

export const SearchInputPreview = React.memo(function SearchInputPreview() {
  const [value, setValue] = React.useState("");
  return (
    <div className="max-w-sm space-y-3">
      <SearchInput
        value={value}
        onChange={setValue}
        placeholder="Search programs, sectors, users..."
      />
      <SearchInput placeholder="Disabled search" disabled />
    </div>
  );
});

export const TagInputPreview = React.memo(function TagInputPreview() {
  const [tags, setTags] = React.useState(["grid", "tron", "iso", "program"]);
  return (
    <div className="max-w-md">
      <TagInput
        tags={tags}
        onTagsChange={setTags}
        placeholder="Add sector tag..."
        maxTags={8}
      />
    </div>
  );
});

export const NewsletterFormPreview = React.memo(
  function NewsletterFormPreview() {
    return (
      <div className="max-w-lg">
        <NewsletterForm
          title="Grid Uplink"
          description="Subscribe to receive system alerts, program updates, and Grid news directly to your terminal."
        />
      </div>
    );
  }
);

export const DatePickerPreview = React.memo(function DatePickerPreview() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return (
    <div className="max-w-xs">
      <DatePicker
        date={date}
        onDateChange={setDate}
        label="Mission Date"
        placeholder="Select cycle date"
      />
    </div>
  );
});

export const tronMoviePreviews: Record<string, React.ComponentType> = {
  "activity-feed": ActivityFeedPreview,
  // Avatar
  "agent-avatar": AgentAvatarPreview,
  // Feedback
  "alert-banner": AlertBannerPreview,
  "announcement-bar": AnnouncementBarPreview,
  // Cinematic UI
  "anomaly-banner": AnomalyBannerPreview,
  "arrival-panel": ArrivalPanelPreview,
  "avatar-group": AvatarGroupPreview,
  badge: BadgePreview,
  "beam-marker": BeamMarkerPreview,
  "bento-grid": BentoGridPreview,
  "boot-sequence": BootSequencePreview,
  "breadcrumb-nav": BreadcrumbNavPreview,
  changelog: ChangelogPreview,
  chip: ChipPreview,
  // Effects
  "circuit-background": CircuitBackgroundPreview,
  "command-menu": CommandMenuPreview,
  "comparison-table": ComparisonTablePreview,
  // New Components
  "copy-button": CopyButtonPreview,
  countdown: CountdownPreview,
  "crt-effect": CRTEffectPreview,
  "cta-banner": CTABannerPreview,
  // Data Display
  "data-card": DataCardPreview,
  "data-stream": DataStreamPreview,
  "data-table": DataTablePreview,
  "date-picker": DatePickerPreview,
  "derez-timer": DerezTimerPreview,
  "diagnostics-panel": DiagnosticsPanelPreview,
  divider: DividerPreview,
  dropdown: DropdownPreview,
  // Form & Input
  "empty-state": EmptyStatePreview,
  "energy-meter": EnergyMeterPreview,
  // Essential UI
  faq: FAQPreview,
  "feature-card": FeatureCardPreview,
  "file-upload": FileUploadPreview,
  "floating-panel": FloatingPanelPreview,
  // Dashboard & Monitoring
  gauge: GaugePreview,
  "glow-container": GlowContainerPreview,
  "god-avatar": GodAvatarPreview,
  // 3D Components
  "grid-3d": Grid3DPreview,
  "grid-scan-overlay": GridScanOverlayPreview,
  heatmap: HeatmapPreview,
  "hero-section": HeroSectionPreview,
  "hud-corner-frame": HUDCornerFramePreview,
  "hud-frame": HUDFramePreview,
  "identity-disc": IdentityDiscPreview,
  "install-command": InstallCommandPreview,
  "kanban-board": KanbanBoardPreview,
  // Game
  "light-cycle-game": LightCycleGamePreview,
  "location-display": LocationDisplayPreview,
  // Marketing & Product
  "logo-cloud": LogoCloudPreview,
  marquee: MarqueePreview,
  "metric-row": MetricRowPreview,
  modal: ModalPreview,
  "newsletter-form": NewsletterFormPreview,
  notification: NotificationPreview,
  "number-input": NumberInputPreview,
  pagination: PaginationPreview,
  "pricing-card": PricingCardPreview,
  "progress-bar": ProgressBarPreview,
  "progress-ring": ProgressRingPreview,
  radar: RadarPreview,
  rating: RatingPreview,
  "regen-indicator": RegenIndicatorPreview,
  // HUD Elements
  reticle: ReticlePreview,
  "search-input": SearchInputPreview,
  select: SelectPreview,
  "sidebar-nav": SidebarNavPreview,
  "signal-indicator": SignalIndicatorPreview,
  skeleton: SkeletonPreview,
  slider: SliderPreview,
  sparkline: SparklinePreview,
  "speed-indicator": SpeedIndicatorPreview,
  stat: StatPreview,
  // Landing Page & Dashboard
  "stat-card": StatCardPreview,
  "stats-counter": StatsCounterPreview,
  "status-bar": StatusBarPreview,
  "status-dot": StatusDotPreview,
  stepper: StepperPreview,
  // Application UI
  tabs: TabsPreview,
  tag: TagPreview,
  "tag-input": TagInputPreview,
  // Interactive UI
  terminal: TerminalPreview,
  "testimonial-card": TestimonialCardPreview,
  "text-input": TextInputPreview,
  timeline: TimelinePreview,
  "timeline-bar": TimelineBarPreview,
  // Timers
  timer: TimerPreview,
  toast: ToastPreview,
  toggle: TogglePreview,
  tooltip: TooltipPreview,
  "tron-accordion": TronAccordionPreview,
  "tron-card": TronCardPreview,
  "tron-carousel": TronCarouselPreview,
  "tron-code-block": TronCodeBlockPreview,
  "tron-drawer": TronDrawerPreview,
  "tron-footer": FooterPreview,
  "tron-popover": TronPopoverPreview,
  tunnel: TunnelPreview,
  "uplink-header": UplinkHeaderPreview,
  "video-player": VideoPlayerPreview,
  "video-progress": VideoProgressPreview,
  waveform: WaveformPreview,
};
