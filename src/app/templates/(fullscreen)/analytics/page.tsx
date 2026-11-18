import { TemplatePreviewFrame } from "@/components/thegridcn/template-preview-frame";
import { templatePageMetadata } from "@/lib/template-pages";

export const metadata = templatePageMetadata("analytics");

export default function AnalyticsPreviewPage() {
  return <TemplatePreviewFrame slug="analytics" />;
}
