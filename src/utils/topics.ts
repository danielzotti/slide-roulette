import { server$ } from "@builder.io/qwik-city";

import { promises as fs } from "fs";
import type { Topics } from "~/models/topics.models";

function getRandomTopic({
  level = 1,
  topics,
}: {
  level: number;
  topics: Topics;
}) {
  const { one, two } = topics;
  let title = one[Math.floor(Math.random() * one.length)];

  if (level >= 2) {
    title += ` e ${one[Math.floor(Math.random() * one.length)]}`;
  }
  if (level >= 3) {
    title += ` ${two[Math.floor(Math.random() * two.length)]}`;
  }
  return title;
}

export const getRandomTopicFromDb = server$(
  async ({ level = 1, lang = "it" }: { level: number; lang: string }) => {
    const file = await fs.readFile(process.cwd() + `/db/${lang}.json`, "utf-8");
    const topics: Topics = JSON.parse(file);
    return getRandomTopic({ level, topics });
  },
);
