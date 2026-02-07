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
  // Game
  "light-cycle-game": LightCycleGamePreview,
};
