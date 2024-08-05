export function fireworks({
  durationInSeconds = 5,
  startVelocity = 30,
  spread = 360,
  ticks = 60,
  zIndex = 0,
}: {
  durationInSeconds?: number;
  startVelocity?: number;
  spread?: number;
  ticks?: number;
  zIndex?: number;
}) {
  import("canvas-confetti").then(({ default: confetti }) => {
    const duration = durationInSeconds * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity, spread, ticks, zIndex };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  });
}
