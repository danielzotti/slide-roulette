import {
  $,
  component$,
  type QRL,
  useOnDocument,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import { MatArrowRightAltOutlined } from "@qwikest/icons/material";
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
        <div class={styles.languageContainer}>
          <Field name="language" type="string">
            {(field) => (
              <>
                <div class={styles.languageLandscape}>
                  {config.languages.list.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      disabled={field.value === lang.code}
                      class={`${styles.flag} flag-${[lang.code as string]}`}
                      onClick$={() => {
                        field.value = lang.code;
                      }}
                    >
                      <img
                        src={`/images/ui/lang-${lang.code}.png`}
                        alt={lang.name}
                        width={100}
                        height={100}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </Field>
        </div>
        <div class={styles.mainContainer}>
          <Field name="language" type="string">
            {(field) => (
              <div class={styles.languagePortrait}>
                {config.languages.list.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    disabled={field.value === lang.code}
                    class={styles.language}
                    onClick$={() => {
                      field.value = lang.code;
                    }}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            )}
          </Field>
          <div class={styles.topContainer}>
            <Field name="orientation" type="string">
              {(field) => (
                <div class={styles.orientationContainer}>
                  <button
                    type="button"
                    disabled={field.value === "landscape"}
                    class={styles.orientation}
                    onClick$={() => {
                      field.value = "landscape";
                    }}
                  >
                    {/*<MatCropLandscapeOutlined />*/}
                    <img
                      src={`/images/ui/desktop-landscape.png`}
                      alt={"Desktop PC (landscape)"}
                      width={50}
                      height={50}
                    />
                    <span>landscape</span>
                  </button>
                  <button
                    type="button"
                    disabled={field.value === "portrait"}
                    class={styles.orientation}
                    onClick$={() => {
                      field.value = "portrait";
                    }}
                  >
                    {/*<MatCropPortraitOutlined />*/}
                    <img
                      src={`/images/ui/smartphone-portrait.png`}
                      alt={"Nokia 3310 (portrait)"}
                      width={21}
                      height={50}
                    />
                    <span>portrait</span>
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
                      field.value = 1;
                    }}
                    class={styles.levelType}
                  >
                    <p>human</p>
                  </button>
                  <button
                    type="button"
                    disabled={[4, 5, 6].includes(field.value as number)}
                    onClick$={() => {
                      field.value = 4;
                    }}
                    class={styles.levelType}
                  >
                    <p>geek</p>
                  </button>
                </div>
              )}
            </Field>
          </div>
          <div class={`${styles.levelContainer}`}>
            <Field name="level" type="number">
              {(field) => (
                <>
                  <p>Choose your difficulty level wisely!</p>
                  {[1, 2, 3].includes(field.value as number) && (
                    <div class={styles.level}>
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
                    <div class={styles.level}>
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
          <div class={styles.slidesContainer}>
            <div class={styles.slidesTitle}>
              <p>Slide numbers</p>
            </div>
            <Field name="slidesCount" type="number">
              {(field) => (
                <div class={styles.slides}>
                  {[3, 5, 7, 10, 15].map((n) => (
                    <button
                      disabled={field.value === n}
                      key={n}
                      type="button"
                      onClick$={() => {
                        field.value = n;
                      }}
                      class={styles.slide}
                    >
                      <p>{n}</p>
                    </button>
                  ))}
                </div>
              )}
            </Field>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          classOverride={styles.startButtonPortrait}
          disabled={isLoading.value}
          ref={submitButtonRef}
        >
          {!isLoading.value && (
            <div>
              <span>Setup's done!</span>
              <MatArrowRightAltOutlined />
            </div>
          )}
          {isLoading.value && <span>Are you ready??</span>}
        </Button>

        <Button
          type="submit"
          variant="primary"
          classOverride={styles.startButtonLandscape}
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
