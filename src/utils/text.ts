export function humanizeTopic(topic?: string): string | undefined {
  if (!topic) {
    return undefined;
  }
  return topic.replace(/-/g, " & ");
}
