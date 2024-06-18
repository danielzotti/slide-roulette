import { type RequestHandler } from "@builder.io/qwik-city";
import { promises as fs } from "fs";
import { config } from "~/config";
import type { RandomTopicApiModel, Topics } from "~/models/topic.models";

/*import { getRandomTopicFromDb } from "~/utils/topics";
export const onGet: RequestHandler = async ({ json, url }) => {
  const level = parseInt(url.searchParams.get("level") ?? "1");
  const lang = url.searchParams.get("lang") ?? "it";
  const title = await getRandomTopicFromDb({ level, lang });
  json(200, { title, lang, level } satisfies RandomTopicApiModel);
};*/

export const onGet: RequestHandler = async ({ json, url }) => {
  const level = parseInt(url.searchParams.get("level") ?? "1");
  const lang = url.searchParams.get("lang") ?? "it";

  const file = await fs.readFile(
    `${process.cwd()}${config.paths.db}/${lang}.json`,
    "utf-8",
  );
  const topics: Topics = JSON.parse(file);

  const { one, two } = topics;

  let title = one[Math.floor(Math.random() * one.length)];

  if (level >= 2) {
    title += ` e ${one[Math.floor(Math.random() * one.length)]}`;
  }
  if (level >= 3) {
    title += ` ${two[Math.floor(Math.random() * two.length)]}`;
  }

  json(200, { title, lang, level } satisfies RandomTopicApiModel);
};
