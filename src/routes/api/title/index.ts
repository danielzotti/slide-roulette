import { type RequestHandler } from "@builder.io/qwik-city";
import { getRandomTopic } from "~/db/topics";

export const onGet: RequestHandler = async ({ json, url }) => {
  const level = parseInt(url.searchParams.get("level") ?? "1");
  json(200, getRandomTopic(level));
};