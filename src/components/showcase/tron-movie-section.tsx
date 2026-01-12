"use client"

import * as React from "react"
import { SectionWrapper, ComponentCard } from "./section-wrapper"
import {
  TronDataCard,
  TronAlert,
  TronAlertBanner,
  TronTimer,
  TronCountdown,
  TronDerezTimer,
  TronReticle,
  TronHUDFrame,
  TronStat,
  TronSpeedIndicator,
  TronRegenIndicator,
  TronVideoPlayer,
  TronFastForwardOverlay,
  TronStatusBar,
  TronInfoPanel,
  TronUplinkBar,
  TronProgressTimeline,
  TronMapMarker,
  TronCoordinateDisplay,
  TronRadar,
} from "@/components/tron-ui"

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
          <TronDataCard
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

          <TronDataCard
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
            <TronAlert variant="warning">ANOMALY FOUND</TronAlert>
            <TronAlert variant="danger">THREAT DETECTED</TronAlert>
            <TronAlert variant="info">SYSTEM ONLINE</TronAlert>
            <TronAlert variant="success" animated={false}>SCAN COMPLETE</TronAlert>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TronAlertBanner
              title="ANOMALY DETECTED"
              subtitle="PRIORITY ALERT"
              variant="warning"
            />
            <TronAlertBanner
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
          <TronTimer
            hours={4}
            minutes={27}
            seconds={53}
            label="ELAPSED"
            sublabel="19:21:42"
            size="lg"
          />

          <div className="flex flex-wrap items-center gap-6">
            <TronCountdown value="00:38 MINUTES" label="EVE KIM ARRIVAL" variant="danger" />
            <TronDerezTimer minutes={16} seconds={48} milliseconds={50} />
          </div>

          <TronTimer
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
            <TronReticle size={100} variant="default" />
            <TronReticle size={100} variant="locked" />
            <TronReticle size={100} variant="scanning" />
          </div>

          {/* HUD Frame */}
          <TronHUDFrame label="SYSTEM STATUS">
            <div className="space-y-3">
              <TronStat label="SPEED" value={160} unit="KM/H" direction="up" />
              <TronStat label="ACCEL" value={2.76} unit="G" direction="neutral" />
              <TronStat label="TEMP" value={78} unit="°C" direction="down" />
            </div>
          </TronHUDFrame>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
          <TronSpeedIndicator speed={160} />
          <TronRegenIndicator />
        </div>
      </ComponentCard>

      {/* Video Player */}
      <ComponentCard title="Video Player Controls">
        <div className="grid gap-6 lg:grid-cols-2">
          <TronVideoPlayer
            currentTime="08:24:22"
            status={videoStatus}
            onPlay={() => setVideoStatus("playing")}
            onPause={() => setVideoStatus("paused")}
          >
            <div className="flex h-full items-center justify-center text-muted-foreground">
              [VIDEO FEED]
            </div>
          </TronVideoPlayer>

          <div className="flex items-center justify-center rounded border border-primary/30 bg-card">
            <TronFastForwardOverlay direction="forward" className="h-full w-full py-8" />
          </div>
        </div>
      </ComponentCard>

      {/* Status Bars */}
      <ComponentCard title="Status Bars & Panels">
        <div className="space-y-4">
          <TronUplinkBar
            channel="ORBITAL RELAY CHANNEL 27A"
            status="RADAR CROSS SECTION: 2.1M² - NONSTANDARD REFLECTION"
            signal="strong"
          />

          <TronStatusBar
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
            <TronInfoPanel
              title="AIRCRAFT N-T355 INBOUND..."
              subtitle="MOTORIZATION"
              status="pending"
              timestamp="12:58:18:07"
            >
              <TronCountdown value="00:38 MINUTES" label="EVE KIM ARRIVAL" variant="danger" />
            </TronInfoPanel>

            <TronInfoPanel
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
            </TronInfoPanel>
          </div>

          <TronProgressTimeline
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
            <TronMapMarker label="ARES" variant="danger" showBeam />
            <TronMapMarker label="EVE" variant="primary" coordinates="1 732m" />
            <TronMapMarker label="ATHENA" variant="danger" showBeam />
          </div>

          {/* Radar & Coordinates */}
          <div className="flex flex-col items-center justify-center gap-4">
            <TronRadar
              size={180}
              targets={[
                { x: 30, y: 35 },
                { x: 65, y: 45 },
                { x: 45, y: 70 },
              ]}
            />
            <TronCoordinateDisplay
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
            <TronUplinkBar
              channel="ORBITAL RELAY CHANNEL 27A"
              status="ACTIVE"
              signal="strong"
            />
          </div>

          {/* Left panel */}
          <div className="absolute left-4 top-16 w-48">
            <TronDataCard
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
            <TronReticle size={150} variant="scanning" />
          </div>

          {/* Right panel */}
          <div className="absolute right-4 top-16">
            <TronDerezTimer minutes={16} seconds={48} milliseconds={50} />
            <div className="mt-4">
              <TronSpeedIndicator speed={160} />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <TronProgressTimeline
              progress={42}
              markers={[{ position: 42, active: true }]}
              currentLabel="TRACKING"
            />
          </div>

          {/* Alert */}
          <div className="absolute left-1/2 top-24 -translate-x-1/2">
            <TronAlert variant="warning" animated>ANOMALY FOUND</TronAlert>
          </div>
        </div>
      </ComponentCard>
    </SectionWrapper>
  )
}
