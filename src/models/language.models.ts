import type { Topics } from "~/models/topic.models";

export interface Language {
  code: Topics["languageCode"];
  name: Topics["languageName"];
}

export interface LanguagesApiModel {
  languages: Language[];
}
