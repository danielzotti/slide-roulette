// const baseUrl = "https://danielzotti.github.io/slide-roulette";
const baseUrl = "https://slide-roulette.danielzotti.it";

export const config = {
  baseUrl,
  title: "Slide Roulette",
  description: "A slide roulette app to test your improvising skills!",
  themeColor: "#2daae1",
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
  github: "https://github.com/danielzotti/slide-roulette",
};
