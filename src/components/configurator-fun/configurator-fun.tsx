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
import levelHumanEasy from "../../../public/images/ui/level-human-easy.png";
import levelHumanMedium from "../../../public/images/ui/level-human-medium.png";
import levelHumanHard from "../../../public/images/ui/level-human-hard.png";

import levelGeekEasy from "../../../public/images/ui/level-geek-easy.png";
import levelGeekMedium from "../../../public/images/ui/level-geek-medium.png";
import levelGeekHard from "../../../public/images/ui/level-geek-hard.png";

import { Button } from "~/components/ui/button/button";
import { config } from "~/config";
import type { ConfigurationForm } from "~/models/configuration.models";
import {
  configurationDefaultValue,
  configurationSchema,
} from "~/models/configuration.models";
import styles from "./configurator-fun.module.scss";

interface ConfiguratorProps {
  onSubmit: QRL<(values: ConfigurationForm) => void>;
}

export const ConfiguratorFun = component$(({ onSubmit }: ConfiguratorProps) => {
  const [configurationForm, { Form, Field }] = useForm<ConfigurationForm>({
    loader: {
      value: configurationDefaultValue,
    },
    validate: zodForm$(configurationSchema),
  });

  const isLoading = useSignal(false);
  const submitButtonRef = useSignal<HTMLButtonElement>();
  // const levelType = useSignal<"human" | "geek">("human");

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

  // const handleSelectLevelType = $((type: "human" | "geek") => {
  //   levelType.value = type;
  // });

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
        <div class={styles.topContainer}>
          <Field name="orientation" type="string">
            {(field) => (
              <div class={styles.orientation}>
                <button
                  type="button"
                  disabled={field.value === "landscape"}
                  class={field.value === "landscape" ? "active" : ""}
                  onClick$={() => {
                    field.value = "landscape";
                  }}
                >
                  landscape
                </button>
                <button
                  type="button"
                  disabled={field.value === "portrait"}
                  class={field.value === "portrait" ? "active" : ""}
                  onClick$={() => {
                    field.value = "portrait";
                  }}
                >
                  portrait
                </button>
              </div>
            )}
          </Field>
          <Field name="level" type="number">
            {(field) => (
              <div class={styles.levelTypeSelector}>
                <button
                  type="button"
                  disabled={[1, 2, 3].includes(field.value as number)}
                  onClick$={() => {
                    // await handleSelectLevelType("human");
                    field.value = 1;
                  }}
                >
                  human
                </button>
                <button
                  type="button"
                  disabled={[4, 5, 6].includes(field.value as number)}
                  onClick$={() => {
                    // await handleSelectLevelType("geek");
                    field.value = 4;
                  }}
                >
                  geek
                </button>
              </div>
            )}
          </Field>
        </div>
        <div class={styles.level}>
          <Field name="level" type="number">
            {(field) => (
              <>
                {[1, 2, 3].includes(field.value as number) && (
                  <div class={styles.levelType}>
                    <button
                      type="button"
                      disabled={field.value === 1}
                      onClick$={() => {
                        field.value = 1;
                      }}
                    >
                      <img
                        src={levelHumanEasy}
                        alt={"Level human easy"}
                        width={100}
                        height={100}
                      />
                      <p>Easy</p>
                    </button>
                    <button
                      type="button"
                      disabled={field.value === 2}
                      onClick$={() => {
                        field.value = 2;
                      }}
                    >
                      <img
                        src={levelHumanMedium}
                        alt={"Level human medium"}
                        width={100}
                        height={100}
                      />
                      <p>Medium</p>
                    </button>
                    <button
                      type="button"
                      disabled={field.value === 3}
                      onClick$={() => {
                        field.value = 3;
                      }}
                    >
                      <img
                        src={levelHumanHard}
                        alt={"Level human hard"}
                        width={100}
                        height={100}
                      />
                      <p>Hard</p>
                    </button>
                  </div>
                )}
                {[4, 5, 6].includes(field.value as number) && (
                  <div class={styles.levelType}>
                    <button
                      type="button"
                      disabled={field.value === 4}
                      onClick$={() => {
                        field.value = 4;
                      }}
                    >
                      <img
                        src={levelGeekEasy}
                        alt={"Level geek easy"}
                        width={100}
                        height={100}
                      />
                      <p>Easy</p>
                    </button>
                    <button
                      type="button"
                      disabled={field.value === 5}
                      onClick$={() => {
                        field.value = 5;
                      }}
                    >
                      <img
                        src={levelGeekMedium}
                        alt={"Level geek medium"}
                        width={100}
                        height={100}
                      />
                      <p>Medium</p>
                    </button>
                    <button
                      type="button"
                      disabled={field.value === 6}
                      onClick$={() => {
                        field.value = 6;
                      }}
                    >
                      <img
                        src={levelGeekHard}
                        alt={"Level geek hard"}
                        width={100}
                        height={100}
                      />
                      <p>Hard</p>
                    </button>
                  </div>
                )}
              </>
            )}
          </Field>
        </div>
        <div class={styles.slideNumbersContainer}>
          <div class="title--main">Slide numbers</div>
          <Field name="slidesCount" type="number">
            {(field) => (
              <>
                {[3, 5, 7, 10, 15].map((n) => (
                  <button
                    disabled={field.value === n}
                    key={n}
                    type="button"
                    onClick$={() => {
                      field.value = n;
                    }}
                  >
                    {n}
                  </button>
                ))}
              </>
            )}
          </Field>
        </div>

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
          classOverride={styles.startButton}
          disabled={isLoading.value}
          ref={submitButtonRef}
          rounded
        >
          {!isLoading.value && <span>Setup's done!</span>}
          {isLoading.value && <span>Starting...</span>}
        </Button>
      </div>
    </Form>
  );
});
