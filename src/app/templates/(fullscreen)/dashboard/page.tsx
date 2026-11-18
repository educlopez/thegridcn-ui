import { TemplatePreviewFrame } from "@/components/thegridcn/template-preview-frame";
import { templatePageMetadata } from "@/lib/template-pages";

export const metadata = templatePageMetadata("dashboard");

export default function DashboardPreviewPage() {
  return <TemplatePreviewFrame slug="dashboard" />;
}
