import type { JSXChildren, PropFunction, Signal } from "@builder.io/qwik";
import styles from "./button.module.scss";

interface ButtonProps {
  classOverride?: string;
  variant?: "primary" | "secondary" | "outline" | "clean";
  children: JSXChildren;
  onClick$?: PropFunction<() => void> | PropFunction<() => void>[];
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  ref?: Signal<HTMLButtonElement | undefined>;
  rounded?: boolean;
  size?: "small" | "default";
}

export const Button = ({
  classOverride,
  variant = "primary",
  children,
  onClick$,
  type = "button",
  disabled = false,
  rounded = false,
  size = "default",
  ref,
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      class={`${styles.button} ${styles[variant]} ${rounded ? styles.rounded : ""} ${size === "small" ? styles.small : ""} ${classOverride}`}
      type={type}
      onClick$={[onClick$]}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
