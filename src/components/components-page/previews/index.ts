import { blocksPreviews } from "./blocks-previews";
import { tronMoviePreviews } from "./tron-movie-previews";
import { buttonPreviews } from "./button-previews";
import { formPreviews } from "./form-previews";
import { dataDisplayPreviews } from "./data-display-previews";
import { overlayPreviews } from "./overlay-previews";
import { standardPreviews } from "./standard-previews";

// Combined registry of all component previews
// Each preview is a React.memo'd component for optimal re-render performance
export const previewRegistry: Record<string, React.ComponentType> = {
  ...blocksPreviews,
  ...tronMoviePreviews,
  ...buttonPreviews,
  ...formPreviews,
  ...dataDisplayPreviews,
  ...overlayPreviews,
  ...standardPreviews,
};

export { blocksPreviews } from "./blocks-previews";
export { tronMoviePreviews } from "./tron-movie-previews";
export { buttonPreviews } from "./button-previews";
export { formPreviews } from "./form-previews";
export { dataDisplayPreviews } from "./data-display-previews";
export { overlayPreviews } from "./overlay-previews";
export { standardPreviews } from "./standard-previews";
