import { TemplatePreviewFrame } from "@/components/thegridcn/template-preview-frame";
import { templatePageMetadata } from "@/lib/template-pages";

export const metadata = templatePageMetadata("login");

export default function LoginPreviewPage() {
  return <TemplatePreviewFrame slug="login" />;
}
