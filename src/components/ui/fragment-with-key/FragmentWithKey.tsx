import { component$, Fragment, Slot } from "@builder.io/qwik";

export const FragmentWithKey = component$(() => (
  <Fragment>
    <Slot />
  </Fragment>
));
