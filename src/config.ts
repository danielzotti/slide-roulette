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
    ] as { code: string; name: string; disabled?: boolean }[],
    defaultCode: "it",
  },
  websites: {
    chatGpt: "https://chat.openai.com",
    danielzotti: "https://www.danielzotti.it",
    marinella: "https://marinella.mastrosimone.eu",
    max: "https://github.com/MaxAttianese",
    antonio: "https://github.com/AntonioRoccoGit",
    github: "https://github.com/danielzotti/slide-roulette",
    unsplash: {
      homepage:
        "https://unsplash.com?utm_source=slide-roulette&utm_medium=referral",
      photographer: (artist: string) =>
        `https://unsplash.com/@${artist}?utm_source=slide-roulette&utm_medium=referral`,
      status: "https://status.unsplash.com",
    },
  },
  unsplash: {
    imageWidth: 1920, // 1280, // 1920,
    imageHeight: 1080, // 720, // 1080,
    topics: {
      // "3d-renders": "CDwuwXJAbEw",
      animals: "Jpg6Kidl-Hk",
      // "architecture-interior": "M8jVbLbTRws",
      // experimental: "qPYsDzvJOYc",
      "fashion-beauty": "S4MKLAsBB74",
      film: "hmenvQhUmxM",
      "food-drink": "xjPR4hlkBGA",
      nature: "6sMVjTLSkeQ",
      people: "towJZFskpGg",
      sports: "Bn-DjrcBrwo",
      travel: "Fzo3zuOHN6w",
      // "rising-stars": "N0SJ103DI1Y",
    },
  },
};
