import {
  type QRL,
  $,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
import { useForm, zodForm$ } from "@modular-forms/qwik";
import { Button } from "~/components/ui/button/button";
import type { ConfigurationForm } from "~/models/configuration.models";
import { configurationSchema } from "~/models/configuration.models";
import { useFormLoader } from "~/routes";
import styles from "./configurator.module.scss";

interface ConfiguratorProps {
  onSubmit: QRL<(values: ConfigurationForm) => void>;
}

export default component$(({ onSubmit }: ConfiguratorProps) => {
  const [, { Form, Field }] = useForm<ConfigurationForm>({
    loader: useFormLoader(),
    validate: zodForm$(configurationSchema),
  });

  const isPortrait = useSignal<boolean>(true);

  const handleSubmit = $<SubmitHandler<ConfigurationForm>>(async (values) => {
    onSubmit(values);
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    isPortrait.value = window.matchMedia("(orientation: portrait)").matches;
  });

  return (
    <Form onSubmit$={handleSubmit} class={styles.form}>
      <div class={styles.configurator}>
        <Field name="language" type="string">
          {(field, props) => (
            <div class={styles.field}>
              <label for={field.name}>{field.name}</label>
              <select
                id={field.name}
                {...props}
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
                id={field.name}
                {...props}
                onInput$={(e) => {
                  field.value = (e.target as HTMLInputElement).value as
                    | "landscape"
                    | "portrait";
                }}
              >
                <option value="portrait" selected={isPortrait.value}>
                  Smartphone
                </option>
                <option value="landscape" selected={!isPortrait.value}>
                  Desktop
                </option>
              </select>
            </div>
          )}
        </Field>

        <Field name="slides" type="number">
          {(field, props) => (
            <div class={styles.field}>
              <label for={field.name}>{field.name}</label>
              <select
                id={field.name}
                {...props}
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
                id={field.name}
                {...props}
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

        <Button type="submit" variant="primary" classOverride={styles.start}>
          Start!
        </Button>
      </div>
    </Form>
  );
});
