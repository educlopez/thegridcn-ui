"use client";

import * as React from "react";
import {
  TronDataCard,
  TronAlertBanner,
  TronTimer,
  TronCountdown,
  TronDerezTimer,
  TronReticle,
  TronHUDFrame,
  TronStat,
  TronSpeedIndicator,
  TronRegenIndicator,
  TronStatusBar,
  TronRadar,
} from "@/components/tron-ui";

export const DataCardPreview = React.memo(function DataCardPreview() {
  return (
    <div className="space-y-4">
      <TronDataCard
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
      <TronAlertBanner variant="info" title="System update available" />
      <TronAlertBanner
        variant="warning"
        title="Warning: High energy consumption detected"
      />
      <TronAlertBanner variant="danger" title="Error: Connection lost" />
    </div>
  );
});

export const TimerPreview = React.memo(function TimerPreview() {
  return (
    <div className="space-y-4">
      <TronTimer
        hours={4}
        minutes={27}
        seconds={53}
        label="ELAPSED"
        sublabel="19:21:42"
        size="lg"
      />
      <TronTimer
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
      <TronCountdown
        value="00:38 MINUTES"
        label="EVE KIM ARRIVAL"
        variant="danger"
      />
      <TronCountdown value="12:45" label="SESSION TIME" variant="default" />
      <TronCountdown value="05:30" label="WARNING" variant="warning" />
    </div>
  );
});

export const DerezTimerPreview = React.memo(function DerezTimerPreview() {
  return (
    <div className="space-y-4">
      <TronDerezTimer minutes={16} seconds={48} milliseconds={50} />
      <TronDerezTimer minutes={5} seconds={30} />
    </div>
  );
});

export const ReticlePreview = React.memo(function ReticlePreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <TronReticle size={100} variant="default" />
        <TronReticle size={100} variant="locked" />
        <TronReticle size={100} variant="scanning" />
      </div>
    </div>
  );
});

export const HUDFramePreview = React.memo(function HUDFramePreview() {
  return (
    <div className="space-y-4">
      <TronHUDFrame label="SYSTEM STATUS">
        <div className="space-y-3">
          <TronStat label="SPEED" value={160} unit="KM/H" direction="up" />
          <TronStat
            label="ACCEL"
            value={2.76}
            unit="G"
            direction="neutral"
          />
          <TronStat label="TEMP" value={78} unit="°C" direction="down" />
        </div>
      </TronHUDFrame>
    </div>
  );
});

export const StatPreview = React.memo(function StatPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-6">
        <TronStat label="SPEED" value={160} unit="KM/H" direction="up" />
        <TronStat label="ACCEL" value={2.76} unit="G" direction="neutral" />
        <TronStat label="TEMP" value={78} unit="°C" direction="down" />
        <TronStat label="POWER" value={95} unit="%" direction="up" />
      </div>
    </div>
  );
});

export const SpeedIndicatorPreview = React.memo(function SpeedIndicatorPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <TronSpeedIndicator speed={160} />
        <TronSpeedIndicator speed={85} />
        <TronSpeedIndicator speed={240} />
      </div>
    </div>
  );
});

export const RegenIndicatorPreview = React.memo(function RegenIndicatorPreview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <TronRegenIndicator />
      </div>
    </div>
  );
});

export const StatusBarPreview = React.memo(function StatusBarPreview() {
  return (
    <div className="space-y-4">
      <TronStatusBar
        leftContent={<span>SYSTEM: ACTIVE</span>}
        rightContent={
          <>
            <span>LAT: 59.90753° N</span>
            <span>LNG: 134.89466° W</span>
          </>
        }
      />
      <TronStatusBar
        variant="alert"
        leftContent={<span>WARNING: ANOMALY DETECTED</span>}
        rightContent={<span>PRIORITY: HIGH</span>}
      />
      <TronStatusBar
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
      <TronRadar
        size={200}
        targets={[
          { x: 30, y: 35 },
          { x: 70, y: 60 },
        ]}
      />
    </div>
  );
});

export const tronMoviePreviews: Record<string, React.ComponentType> = {
  "data-card": DataCardPreview,
  "alert-banner": AlertBannerPreview,
  "timer": TimerPreview,
  "countdown": CountdownPreview,
  "derez-timer": DerezTimerPreview,
  "reticle": ReticlePreview,
  "hud-frame": HUDFramePreview,
  "stat": StatPreview,
  "speed-indicator": SpeedIndicatorPreview,
  "regen-indicator": RegenIndicatorPreview,
  "status-bar": StatusBarPreview,
  "radar": RadarPreview,
};
