"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export const ButtonVariantsPreview = React.memo(function ButtonVariantsPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="btn-glow">Default</Button>
      <Button variant="secondary" className="btn-glow">
        Secondary
      </Button>
      <Button variant="destructive" className="btn-glow">
        Destructive
      </Button>
      <Button variant="outline" className="btn-glow">
        Outline
      </Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
});

export const ButtonSizesPreview = React.memo(function ButtonSizesPreview() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="lg" className="btn-glow">
        Large
      </Button>
      <Button size="default" className="btn-glow">
        Default
      </Button>
      <Button size="sm" className="btn-glow">
        Small
      </Button>
    </div>
  );
});

export const buttonPreviews: Record<string, React.ComponentType> = {
  "button-variants": ButtonVariantsPreview,
  "button-sizes": ButtonSizesPreview,
};
