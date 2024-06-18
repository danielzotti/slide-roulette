import { type RequestHandler } from "@builder.io/qwik-city";
import { readdirSync, readFileSync } from "fs";
import { config } from "~/config";
import type { Topics } from "~/models/topic.models";

// import { getLanguages } from "~/utils/languages";
/*export const onGet: RequestHandler = async ({ json }) => {
  const languages = getLanguages();
  json(200, { languages });
};*/

export const onGet: RequestHandler = async ({ json }) => {
  const fileNames = readdirSync(`${process.cwd()}${config.paths.db}`);
  const languages = fileNames.map((fileName) => {
    const file = readFileSync(
      `${process.cwd()}${config.paths.db}/${fileName}`,
      "utf-8",
    );
    const { languageName: name, languageCode: code }: Topics = JSON.parse(file);
    return {
      code,
      name,
    };
  });
  json(200, { languages });
};
