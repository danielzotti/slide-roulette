import { config } from "~/config";

export async function fetchApi<T = unknown>(url: string) {
  const response = await fetch(`${config.baseUrl}${url}`);
  return (await response.json()) as T;
}
