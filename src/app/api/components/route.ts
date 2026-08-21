import {
  corsHeaders,
  discoveryJson,
  discoveryOptions,
} from "@/lib/agent/discovery";
import { getAllComponents } from "@/lib/component-data";

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim().toLowerCase() ?? "";
  const components = getAllComponents();

  const filtered =
    query.length === 0
      ? components
      : components.filter(
          (component) =>
            component.id.toLowerCase().includes(query) ||
            component.name.toLowerCase().includes(query) ||
            component.title.toLowerCase().includes(query) ||
            component.type.toLowerCase().includes(query) ||
            component.section.toLowerCase().includes(query)
        );

  return discoveryJson({
    components: filtered.map((component) => ({
      id: component.id,
      name: component.name,
      section: component.section,
      title: component.title,
      type: component.type,
    })),
  });
}

export function HEAD() {
  return new Response(null, {
    headers: corsHeaders("application/json; charset=utf-8"),
  });
}

export function OPTIONS() {
  return discoveryOptions();
}
