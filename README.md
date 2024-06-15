# Slide Roulette
A slide roulette app: one random topic and 3 (or more) random slides (with just an image) to test your improvising skills!

## Thanks to
- [Qwik](https://qwik.dev/)
- [Vercel](https://vercel.com/)
- [ChatGPT](https://chat.openai.com/) for the topics generation
- [Unsplash](https://unsplash.com/) for the random images
- [Lorem Picsum](https://picsum.photos/) for the random images (if Unsplash is down)
- [Unsample](https://unsample.net/) for the local random images (if Unsplash/Lorem Picsum service is down)
- [Bing Image Generation](https://www.bing.com/images) for the logo

## Notes
- Error: ` [PLUGIN_ERROR]: Invalid module "@qwik-city-plan" is not a valid package name imported from /Users/daniel/Projects/github/slide-roulette/node_modules/@builder.io/qwik-city/index.qwik.mjs`
  - See https://github.com/QwikDev/qwik/issues/6024#issuecomment-2029467547
  - TLDR: move `dependencies` to `devDependencies`

## TODO
- [x] Automatically check device orientation
- [x] Check Italian topics (especially for level 2 and 3)
- [x] Fix random problems with image loading (different images between fullscreen and standard mode)
- [x] Fallback mode if Unsplash service is down (local images)
- [ ] Add English topics
- [ ] Contribution guidelines
