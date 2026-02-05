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
