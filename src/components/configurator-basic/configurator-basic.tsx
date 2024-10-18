import {
  $,
  component$,
  type QRL,
  useOnDocument,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
import { setValue, useForm, zodForm$ } from "@modular-forms/qwik";
import { Button } from "~/components/ui/button/button";
import { config } from "~/config";
import type { ConfigurationForm } from "~/models/configuration.models";
import {
  configurationDefaultValue,
  configurationSchema,
} from "~/models/configuration.models";
import styles from "./configurator-basic.module.scss";

interface ConfiguratorProps {
  onSubmit: QRL<(values: ConfigurationForm) => void>;
}

export const ConfiguratorBasic = component$(
  ({ onSubmit }: ConfiguratorProps) => {
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

    useOnWindow(
      "load",
      $(() => {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        setValue(
          configurationForm,
          "orientation",
          isPortrait ? "portrait" : "landscape",
        );
      }),
    );

    useOnDocument("keydown", handleKeyDown);

    return (
      <Form onSubmit$={handleSubmit} class={styles.form}>
        <div class={styles.configurator}>
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
                  {config.languages.list.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      selected={lang.code === config.languages.defaultCode}
                      disabled={lang.disabled}
                    >
                      {lang.name}
                    </option>
                  ))}
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
                  <option
                    value="portrait"
                    selected={field.value === "portrait"}
                  >
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
                  <optgroup label="PERSON">
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                  </optgroup>
                  <optgroup label="NERD">
                    <option value="4">Junior</option>
                    <option value="5">Senior</option>
                    <option value="6">Stephen Hawking</option>
                  </optgroup>
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
            {!isLoading.value && <span>Let's go!</span>}
            {isLoading.value && <span>Starting...</span>}
          </Button>
        </div>
      </Form>
    );
  },
);
