import { TemplatePreviewFrame } from "@/components/thegridcn/template-preview-frame";
import { templatePageMetadata } from "@/lib/template-pages";

export const metadata = templatePageMetadata("landing");

export default function LandingPreviewPage() {
  return <TemplatePreviewFrame slug="landing" />;
}
