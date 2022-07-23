import { JSX } from "solid-js";

const BADGE_VARIANT_TODO = "todo";
const BADGE_VARIANT_DONE = "done";

const variants = {
  [BADGE_VARIANT_TODO]: "bg-blue-100 text-blue-800",
  [BADGE_VARIANT_DONE]: "bg-green-100 text-green-800",
};

interface Props extends JSX.HTMLAttributes<HTMLSpanElement> {
  variant?: typeof BADGE_VARIANT_DONE | typeof BADGE_VARIANT_TODO;
}

export function Badge({ children, variant = BADGE_VARIANT_TODO }: Props) {
  return (
    <span
      class={`inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
