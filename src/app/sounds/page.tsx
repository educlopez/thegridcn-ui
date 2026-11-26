import type { Metadata } from "next";
import Link from "next/link";
import { DocShell } from "@/components/docs/doc-shell";
import { TronHeader } from "@/components/layout";
import { SiteFooter } from "@/components/layout/site-footer";
import { RelaySoundSequence } from "@/components/sounds/relay-sound-sequence";
import { SoundDeck } from "@/components/sounds/sound-deck";

export const metadata: Metadata = {
  alternates: { canonical: "https://thegridcn.com/sounds" },
  description:
    "Audition and download original UI sounds, or install Grid Sounds from the shadcn registry.",
  title: "Grid Sounds | The Gridcn",
};

export default function SoundsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TronHeader />
      <main>
        <DocShell
          crumbs={[
            { href: "/components", label: "Components" },
            { label: "Sounds" },
          ]}
          subtitle="Short cues for actions that need to be heard. Silent by default."
          title="Grid Sounds"
        >
          <div className="space-y-10">
            <SoundDeck />

            <section
              aria-labelledby="sounds-relay"
              className="grid items-start gap-5 border-primary/25 border-y py-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]"
            >
              <div>
                <p className="font-mono text-primary text-xs tracking-widest">
                  SIGNAL TEST / 01
                </p>
                <h2 className="mt-2 font-display text-2xl" id="sounds-relay">
                  Bring a relay online.
                </h2>
                <p className="mt-2 max-w-sm text-muted-foreground text-sm leading-relaxed">
                  Boot, select a channel, then lock the signal. Each action
                  fires a different cue if site sound is on. The sequence works
                  muted.
                </p>
                <Link
                  className="mt-3 inline-flex min-h-11 items-center text-primary text-sm underline underline-offset-4"
                  href="/components#sound-sequence"
                >
                  View Sound Sequence in Components
                </Link>
              </div>
              <RelaySoundSequence />
            </section>

            <section aria-labelledby="sounds-install" className="space-y-3">
              <h2 className="font-display text-lg" id="sounds-install">
                Use them in your app
              </h2>
              <p className="text-muted-foreground text-sm">
                Install the synthesizer or download each cue as a WAV. Keep
                audio off until the user enables it.
              </p>
              <pre className="overflow-x-auto rounded border border-primary/25 bg-primary/5 p-4 font-mono text-sm">
                <code>npx shadcn@latest add @thegridcn/grid-sounds</code>
              </pre>
              <pre className="overflow-x-auto rounded border border-primary/25 bg-primary/5 p-4 font-mono text-sm">
                <code>{`import { playGridSound, setGridSoundEnabled } from "@/lib/grid-sounds";

// Connect to your own opt-in control.
setGridSoundEnabled(true);
playGridSound("confirm");`}</code>
              </pre>
            </section>

            <section aria-labelledby="sounds-try" className="space-y-3">
              <h2 className="font-display text-lg" id="sounds-try">
                Try them on components
              </h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {[
                  ["sound-pad", "Sound Pad"],
                  ["sound-action", "Sound Action"],
                  ["sound-sequence", "Sound Sequence"],
                  ["shatter", "Shatter"],
                  ["focus-lens", "Focus Lens"],
                  ["scan-reveal", "Scan Reveal"],
                  ["toggle", "Toggle"],
                  ["copy-button", "Copy Button"],
                  ["boot-sequence", "Boot Sequence"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <Link
                      className="text-primary underline underline-offset-4"
                      href={`/components#${id}`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </DocShell>
      </main>
      <SiteFooter />
    </div>
  );
}
