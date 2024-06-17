import { type RequestHandler } from "@builder.io/qwik-city";
import { getRandomTopicFromDb } from "~/utils/topics";

export const onGet: RequestHandler = async ({ json, url }) => {
  const level = parseInt(url.searchParams.get("level") ?? "1");
  const lang = url.searchParams.get("lang") ?? "it";
  json(200, getRandomTopicFromDb({ level, lang }));
};
