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

  if (level >= 4) {
    const { nerd, two, conjunction } = topics;
    let nerdTitle = nerd[Math.floor(Math.random() * nerd.length)];

    if (level >= 5) {
      nerdTitle += ` ${conjunction} ${nerd[Math.floor(Math.random() * nerd.length)]}`;
    }
    if (level >= 6) {
      nerdTitle += ` ${two[Math.floor(Math.random() * two.length)]}`;
    }
    return nerdTitle;
  }

  const { one, two, conjunction } = topics;

  let title = one[Math.floor(Math.random() * one.length)];

  if (level >= 2) {
    title += ` ${conjunction} ${one[Math.floor(Math.random() * one.length)]}`;
  }
  if (level >= 3) {
    title += ` ${two[Math.floor(Math.random() * two.length)]}`;
  }
  return title;
}
