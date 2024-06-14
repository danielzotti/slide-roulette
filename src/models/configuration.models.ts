import { z } from "@builder.io/qwik-city";

export const configurationDefaultValue: ConfigurationForm = {
  language: "it",
  level: 1,
  slidesCount: 5,
  orientation: "landscape",
};

export const configurationSchema = z.object({
  level: z
    .number()
    .min(1, "Please enter a number greater or equal than one.")
    .max(3, "The max level is 3"),
  language: z.string(),
  slidesCount: z
    .number()
    .min(1, "Please enter a number between 1 and 100.")
    .max(100, "Please enter a number between 1 and 100."),
  orientation: z.union([z.literal("landscape"), z.literal("portrait")]),
});

export type ConfigurationForm = z.infer<typeof configurationSchema>;
