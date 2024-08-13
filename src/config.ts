const baseUrl = "https://slide-roulette.danielzotti.it"; // "https://danielzotti.github.io/slide-roulette";

export const config = {
  baseUrl,
  title: "Slide Roulette",
  description: "A slide roulette app to test your improvising skills!",
  themeColor: "#FF5C00",
  // manifest: '/manifest.json',
  // faviconUrl: '/static/icons/favicon.png',
  // faviconAppleUrl: '/static/icons/favicon-apple.png',
  apis: {
    unsplash: "https://api.unsplash.com/photos/random",
  },
  urls: {
    slides: "/slides",
  },
  folders: {
    slides: {
      landscape: `/images/slides/landscape`,
      portrait: `/images/slides/portrait`,
    },
  },
  languages: {
    list: [
      { code: "en", name: "English" },
      { code: "it", name: "Italiano" },
      { code: "es", name: "Español" }, // , disabled: true
    ],
    defaultCode: "it",
  },
  websites: {
    chatGpt: "https://chat.openai.com",
    danielzotti: "https://www.danielzotti.it",
    github: "https://github.com/danielzotti/slide-roulette",
    unsplash: {
      homepage:
        "https://unsplash.com?utm_source=slide-roulette&utm_medium=referral",
      photographer: (artist: string) =>
        `https://unsplash.com/@${artist}?utm_source=slide-roulette&utm_medium=referral`,
      status: "https://status.unsplash.com",
    },
  },
};
