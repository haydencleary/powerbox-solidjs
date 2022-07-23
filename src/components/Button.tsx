import { JSX } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const variants = {
  primary: "shadow-sm text-white bg-blue-600 hover:bg-blue-700",
  secondary: "text-blue-700 bg-blue-100 hover:bg-blue-200",
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: Props) {
  return (
    <button
      type={type}
      class={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
