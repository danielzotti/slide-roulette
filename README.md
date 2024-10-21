# Slide Roulette

A slide roulette app: one random topic and 3 (or more) random slides (with just an image) to test your improvising
skills!

> TODO: video demo

## Other contributors
- [Marinella Mastrosimone](https://github.com/cybermarinella) (UX/UI)
- [Massimiliano Attianese](https://github.com/MaxAttianese) (Dev)
- [Antonio Rocco](https://github.com/AntonioRoccoGit) (Dev)

## Contribution guidelines

...just open a PR! 🙃 I'll be happy to review it and merge it if it's good!

First time contributing to an open source project? See [First Contributions repo](https://firstcontributions.github.io/)
and [How to make your first Open Source contribution](https://www.youtube.com/watch?v=Xg6C_ij99TI).

See [Slide Roulette Project](https://github.com/users/danielzotti/projects/2) for more details about next steps (WIP).

### How to add a new language

#### 1. Create a new TypeScript file in `src/topics` folder, called as the language code (e.g. `en.ts` for English)

- The structure should be as follows:

```typescript
// src/topics/en.ts
export default {
    languageCode: "en",
    languageName: "English",
    conjunction: "and",
    one: ["shadows", "trees"],
    two: ["with a strange shape of clowns", "created to scare people"]
}
```

- Set the proper conjunction for the language (e.g. `and` for English, `e` for Italian, etc.)
- Add random plural nouns in the `one` array (e.g shadows, trees, etc.)
- Add random sentences related (or not) to the plural nouns in the `two` array
- Please remember that different levels will compose those 2 arrays:
    - Level 1: Randomly select one single element from `one` array
    - Level 2: Randomly select 2 elements from `one` array and compose them with the conjunction
    - Level 3: Starts from Level 2 but adds a random sentence from the `two` array

#### 2. Import the file `src/topics/en.ts` in the `src/utils/topics.ts` file and add a switch case for that specific file

```typescript
// src/utils/topics.ts
import en from "../topics/en"; // <- IMPORT FILE

switch (lang) {
    // ...
    case "en":          // <- ADD A SWITCH CASE
        topics = en;
        break;
    // ...
}

```

#### 3. Add the language code in the `src/config.ts` file inside the `languages.list` array in order to show it in the language selector dropdown menu.

```typescript
// src/config.ts
const config = {
    //...
    languages: {
        list: [
            // ADD A NEW LANGUAGE HERE
            {code: "en", name: "English"},
        ],
    },
    // ...
}

```

## Thanks to

- [Qwik](https://qwik.dev/)
- [Vercel](https://vercel.com/)
- [ChatGPT](https://chat.openai.com/) for the topics generation
- [Unsplash](https://unsplash.com/) for the random images
- [Lorem Picsum](https://picsum.photos/) for the random images (if Unsplash is down)
- [Unsample](https://unsample.net/) for the local random images (if Unsplash/Lorem Picsum service is down)
- [Bing Image Generation](https://www.bing.com/images) for the logo
- [Play Speechless by Carmelo Ventimiglia](https://carmeloventimiglia.dev/play-speechless/) for the idea
- [Canvas Confetti](https://github.com/catdad/canvas-confetti) for the confetti effect
- [Fancy Border Radius Generator](https://9elements.github.io/fancy-border-radius) for the Jeff Goldblum Image's border 

## Notes

Error: ` [PLUGIN_ERROR]: Invalid module "@qwik-city-plan" is not a valid package name imported from /Users/daniel/Projects/github/slide-roulette/node_modules/@builder.io/qwik-city/index.qwik.mjs`

- See https://github.com/QwikDev/qwik/issues/6024#issuecomment-2029467547
- TLDR: move `dependencies` to `devDependencies`

## TODO

- [ ] Page and slides transitions
- [ ] More animations!
- [ ] Offline mode
