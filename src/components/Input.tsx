import { JSX } from "solid-js/jsx-runtime";

interface Props extends JSX.HTMLAttributes<HTMLInputElement> {
  type: string;
}

export function Input({ type = "text", ...restProps }: Props) {
  return (
    <input
      type={type}
      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded accent-blue"
      {...restProps}
    />
  );
}
