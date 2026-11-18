import { TemplatePreviewFrame } from "@/components/thegridcn/template-preview-frame";
import { templatePageMetadata } from "@/lib/template-pages";

export const metadata = templatePageMetadata("blog");

export default function BlogPreviewPage() {
  return <TemplatePreviewFrame slug="blog" />;
}
