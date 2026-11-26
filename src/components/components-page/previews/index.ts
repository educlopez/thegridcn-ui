import { GalleryAtlas } from "@/components/website/gallery-atlas";
import { blocksPreviews } from "./blocks-previews";
import { buttonPreviews } from "./button-previews";
import { dataDisplayPreviews } from "./data-display-previews";
import { DeploymentPreview } from "./deployment-preview";
import { formPreviews } from "./form-previews";
import {
  ContrastLensPreview,
  FocusLensPreview,
  PixelResolvePreview,
  PrismFoldPreview,
  PulseRevealPreview,
  ScanRevealPreview,
} from "./inspection-effect-previews";
import { MachineReadoutPreview } from "./machine-readout-preview";
import { overlayPreviews } from "./overlay-previews";
import {
  BeforeAfterPreview,
  MetricTrendPreview,
  SoundActionPreview,
  UsageMeterPreview,
} from "./product-previews";
import { protocolEffects } from "./protocol-previews";
import { ShatterPreview } from "./shatter-preview";
import { SoundPadPreview, SoundSequencePreview } from "./sound-previews";
import { standardPreviews } from "./standard-previews";
import { tronMoviePreviews } from "./tron-movie-previews";

// Combined registry of all component previews
// Each preview is a React.memo'd component for optimal re-render performance
export const previewRegistry: Record<string, React.ComponentType> = {
  "control-rods": DeploymentPreview,
  "machine-readout": MachineReadoutPreview,
  "perception-field": GalleryAtlas,
  "scaffold-diff": DeploymentPreview,
  ...Object.fromEntries(protocolEffects.map(({ id, Demo }) => [id, Demo])),
  ...blocksPreviews,
  ...tronMoviePreviews,
  ...buttonPreviews,
  ...formPreviews,
  ...dataDisplayPreviews,
  ...overlayPreviews,
  ...standardPreviews,
  "before-after": BeforeAfterPreview,
  "contrast-lens": ContrastLensPreview,
  "focus-lens": FocusLensPreview,
  "metric-trend": MetricTrendPreview,
  "pixel-resolve": PixelResolvePreview,
  "prism-fold": PrismFoldPreview,
  "pulse-reveal": PulseRevealPreview,
  "scan-reveal": ScanRevealPreview,
  shatter: ShatterPreview,
  "sound-action": SoundActionPreview,
  "sound-pad": SoundPadPreview,
  "sound-sequence": SoundSequencePreview,
  "usage-meter": UsageMeterPreview,
};

export { blocksPreviews } from "./blocks-previews";
export { buttonPreviews } from "./button-previews";
export { dataDisplayPreviews } from "./data-display-previews";
export { formPreviews } from "./form-previews";
export { overlayPreviews } from "./overlay-previews";
export { standardPreviews } from "./standard-previews";
export { tronMoviePreviews } from "./tron-movie-previews";
