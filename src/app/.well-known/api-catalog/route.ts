import {
  API_CATALOG_CONTENT_TYPE,
  getApiCatalog,
} from "@/lib/agent/api-catalog";
import { discoveryJson, discoveryOptions } from "@/lib/agent/discovery";

export const dynamic = "force-static";

export function GET() {
  return discoveryJson(getApiCatalog(), API_CATALOG_CONTENT_TYPE);
}

export function OPTIONS() {
  return discoveryOptions();
}
