import { corsHeaders, discoveryOptions } from "@/lib/agent/discovery";
import { getRobotsTxt } from "@/lib/agent/robots-txt";

export const dynamic = "force-static";

export function GET() {
  return new Response(getRobotsTxt(), {
    headers: {
      ...corsHeaders("text/plain; charset=utf-8"),
    },
  });
}

export function OPTIONS() {
  return discoveryOptions();
}
