export function getRandomNumberArrayInRange(
  min: number,
  max: number,
  n = 1,
): Array<number> {
  const numbers = new Set<number>();
  while (numbers.size < n) numbers.add(getRandomNumberInRange(min, max));
  return [...numbers];
}

export function getRandomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
