import { $, component$ } from "@builder.io/qwik";
import { Button } from "~/components/ui/button/button";
import styles from "./configurator.module.scss";

export default component$(() => {
  return (
    <form>
      <div class={styles.configurator}>
        <div class={styles.field}>
          <label for="level">Level</label>
          <select id="level" name="level">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div class={styles.field}>
          <label for="language">Language</label>
          <select name="language">
            <option value="it">Italiano</option>
            <option value="en" disabled>
              English
            </option>
          </select>
        </div>
        <div class={styles.field}>
          <label for="slides">Number of slides</label>
          <input type="number" min="1" max="10" name="slides" value="5" />
        </div>
        <Button variant="primary">Start!</Button>
      </div>
    </form>
  );
});
