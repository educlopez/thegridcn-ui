import { TemplatePreviewer } from "@/components/thegridcn/template-previewer";
import { TEMPLATE_PAGES, type TemplatePageSlug } from "@/lib/template-pages";

export function TemplatePreviewFrame({ slug }: { slug: TemplatePageSlug }) {
  const page = TEMPLATE_PAGES[slug];

  return (
    <div className="flex h-dvh flex-col bg-background">
      <section className="shrink-0 border-border border-b bg-card/80 px-4 py-3">
        <p className="mx-auto max-w-5xl text-foreground/80 text-sm leading-relaxed">
          {page.extract}
        </p>
      </section>
      <div className="min-h-0 flex-1">
        <TemplatePreviewer name={page.name} slug={slug} />
      </div>
    </div>
  );
}
