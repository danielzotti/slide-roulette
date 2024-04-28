import { z } from "@builder.io/qwik-city";

export const configurationDefaultValue: ConfigurationForm = {
  language: "it",
  level: 1,
  slides: 5,
};

export const configurationSchema = z.object({
  level: z
    .number()
    .min(1, "Please enter a number greater or equal than one.")
    .max(3, "The max level is 3"),
  language: z.string(),
  slides: z
    .number()
    .min(1, "Please enter a number between 1 and 100.")
    .max(100, "Please enter a number between 1 and 100."),
});

export type ConfigurationForm = z.infer<typeof configurationSchema>;