import type { QRL } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
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

  const handleSubmit = $<SubmitHandler<ConfigurationForm>>(async (values) => {
    onSubmit(values);
  });

  return (
    <>
      <Form onSubmit$={handleSubmit}>
        <div class={styles.configurator}>
          <Field name="level" type="number">
            {(field, props) => (
              <div class={styles.field}>
                <label for="level">Level</label>
                <select
                  id={field.name}
                  {...props}
                  onInput$={(e) => {
                    field.value = +(e.target as HTMLInputElement).value;
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            )}
          </Field>

          <Field name="language" type="string">
            {(field, props) => (
              <div class={styles.field}>
                <label for="language">Language</label>
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

          <Field name="slides" type="number">
            {(field, props) => (
              <div class={styles.field}>
                <label for="slides">Slides</label>
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

          <Field name="orientation" type="string">
            {(field, props) => (
              <div class={styles.field}>
                <label for="slides">Orientation</label>
                <select
                  id={field.name}
                  {...props}
                  onInput$={(e) => {
                    field.value = (e.target as HTMLInputElement).value as
                      | "landscape"
                      | "portrait";
                  }}
                >
                  <option value="landscape">Landscape (Desktop)</option>
                  <option value="portrait">Portrait (Smartphone)</option>
                </select>
              </div>
            )}
          </Field>

          <Button type="submit" variant="primary" classOverride={styles.start}>
            Start!
          </Button>
        </div>
      </Form>
    </>
  );
});
