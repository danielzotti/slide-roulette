export interface Topics {
  languageCode: "it" | "en";
  languageName: "Italiano" | "English";
  one: Array<string>;
  two: Array<string>;
}

export interface RandomTopicApiModel {
  title: string;
  lang: string;
  level: number;
}
