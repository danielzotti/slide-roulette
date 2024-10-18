import { $, component$, useSignal } from "@builder.io/qwik";
import { GoMarkGithub16 } from "@qwikest/icons/octicons";
import { Button } from "~/components/ui/button/button";
import infoSrc from "../../../public/images/ui/info.png";
import infoMemeSrc from "../../../public/images/ui/info-meme.png";
import { config } from "~/config";
import styles from "./footer.module.scss";

export const Footer = component$(() => {
  const dialogRef = useSignal<HTMLDialogElement>();
  return (
    <>
      <img
        src={infoSrc}
        width={50}
        alt={"About Slide Roulette"}
        height={50}
        class={styles.info}
        onClick$={() => {
          dialogRef.value!.showModal();
        }}
        title={"About Slide Roulette"}
      />
      <dialog ref={dialogRef} class={styles.dialog}>
        <div class={styles.dialogWrapper}>
          <div class={styles.infoMeme}>
            <img
              src={infoMemeSrc}
              alt={"Meme for credits"}
              width={651 * 0.25}
              height={945 * 0.25}
              class={styles.infoMemeImage}
            />
          </div>
          <div class={styles.dialogContent}>
            <p class={styles.credits}>
              Thanks to{" "}
              <a href={config.websites.chatGpt} target="_blank">
                ChatGPT
              </a>{" "}
              for generating the topics and to{" "}
              <a href={`${config.websites.unsplash.homepage}`} target="_blank">
                Unsplash
              </a>{" "}
              to provide the images.
            </p>

            <p class={styles.author}>
              Made with ❤️ by{" "}
              <a target="_blank" href={config.websites.danielzotti}>
                Daniel
              </a>{" "}
              with the help of{" "}
              <a target="_blank" href={config.websites.marinella}>
                Marinella
              </a>
              ,{" "}
              <a target="_blank" href={config.websites.antonio}>
                Antonio
              </a>{" "}
              and{" "}
              <a target="_blank" href={config.websites.max}>
                Max
              </a>
              .
            </p>

            <p class={styles.code}>
              ...wanna dive into the open-source code? It's on{" "}
              <a target="_blank" href={config.websites.github}>
                <GoMarkGithub16 /> GitHub
              </a>{" "}
              of course!
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          rounded
          size="small"
          onClick$={$(() => {
            dialogRef.value!.close();
          })}
          classOverride={styles.closeButton}
        >
          Close
        </Button>
      </dialog>
    </>
  );
});
