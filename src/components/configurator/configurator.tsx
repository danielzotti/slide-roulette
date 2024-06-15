import {
  $,
  component$,
  type QRL,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
import { setValue, useForm, zodForm$ } from "@modular-forms/qwik";
import { Button } from "~/components/ui/button/button";
import type { ConfigurationForm } from "~/models/configuration.models";
import {
  configurationDefaultValue,
  configurationSchema,
} from "~/models/configuration.models";
import styles from "./configurator.module.scss";

interface ConfiguratorProps {
  onSubmit: QRL<(values: ConfigurationForm) => void>;
}

export const Configurator = component$(({ onSubmit }: ConfiguratorProps) => {
  const [configurationForm, { Form, Field }] = useForm<ConfigurationForm>({
    loader: {
      value: configurationDefaultValue,
    },
    validate: zodForm$(configurationSchema),
  });

  const isLoading = useSignal(false);
  const submitButtonRef = useSignal<HTMLButtonElement>();

  const handleSubmit = $<SubmitHandler<ConfigurationForm>>((values) => {
    isLoading.value = true;
    onSubmit(values);
  });

  const handleKeyDown = $((event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        (submitButtonRef.value as HTMLButtonElement).click();
        break;
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    setValue(
      configurationForm,
      "orientation",
      isPortrait ? "portrait" : "landscape",
    );
  });

  return (
    <Form onSubmit$={handleSubmit} class={styles.form}>
      <div class={styles.configurator} document:onKeyDown$={handleKeyDown}>
        <Field name="language" type="string">
          {(field, props) => (
            <div class={styles.field}>
              <label for={field.name}>{field.name}</label>
              <select
                {...props}
                id={field.name}
                value={field.value}
                onInput$={(e) => {
                  field.value = (e.target as HTMLInputElement).value;
                }}
              >
                <option value="it">Italian</option>
                <option value="en" disabled>
                  English
                </option>
              </select>
            </div>
          )}
        </Field>

        <Field name="orientation" type="string">
          {(field, props) => (
            <div class={styles.field}>
              <label for={field.name}>{field.name}</label>
              <select
                {...props}
                id={field.name}
                value={field.value}
                onInput$={(e) => {
                  field.value = (e.target as HTMLInputElement).value as
                    | "landscape"
                    | "portrait";
                }}
              >
                <option value="portrait" selected={field.value === "portrait"}>
                  Smartphone
                </option>
                <option
                  value="landscape"
                  selected={field.value === "landscape"}
                >
                  Desktop
                </option>
              </select>
            </div>
          )}
        </Field>

        <Field name="slidesCount" type="number">
          {(field, props) => (
            <div class={styles.field}>
              <label for={field.name}>{field.name}</label>
              <select
                {...props}
                id={field.name}
                value={field.value}
                onInput$={(e) => {
                  field.value = +(e.target as HTMLInputElement).value;
                }}
              >
                <option>3</option>
                <option selected>5</option>
                <option>7</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select>
            </div>
          )}
        </Field>

        <Field name="level" type="number">
          {(field, props) => (
            <div class={styles.field}>
              <label for={field.name}>{field.name}</label>
              <select
                {...props}
                id={field.name}
                value={field.value}
                onInput$={(e) => {
                  field.value = +(e.target as HTMLInputElement).value;
                }}
              >
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
              </select>
            </div>
          )}
        </Field>

        <Button
          type="submit"
          variant="primary"
          classOverride={styles.start}
          disabled={isLoading.value}
          ref={submitButtonRef}
        >
          {!isLoading.value && <span>Start!</span>}
          {isLoading.value && <span>Starting...</span>}
        </Button>
      </div>
    </Form>
  );
});
