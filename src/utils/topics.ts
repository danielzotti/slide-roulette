// LANGUAGES
import it from "../topics/it";
import en from "../topics/en";

// ADD NEW LANGUEAGES HERE
// import new from "../topics/new";

export function getRandomTopic({
  level,
  lang,
}: {
  level: number;
  lang: string;
}) {
  let topics = it;
  switch (lang) {
    case "it":
      topics = it;
      break;
    case "en":
      topics = en;
      break;
  }

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
