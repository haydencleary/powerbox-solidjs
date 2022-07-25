import { JSX } from "solid-js";

const BUTTON_VARIANT_PRIMARY = "primary";
const BUTTON_VARIANT_SECONDARY = "secondary";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: typeof BUTTON_VARIANT_PRIMARY | typeof BUTTON_VARIANT_SECONDARY;
}

const variants = {
  [BUTTON_VARIANT_PRIMARY]:
    "shadow-sm text-white bg-blue-600 hover:bg-blue-700",
  [BUTTON_VARIANT_SECONDARY]: "text-blue-700 bg-blue-100 hover:bg-blue-200",
};

export function Button(props: Props) {
  const type = () => props.type || "button";
  const variant = () => props.variant || BUTTON_VARIANT_PRIMARY;

  return (
    <button
      type={type()}
      class={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        variants[variant()]
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
