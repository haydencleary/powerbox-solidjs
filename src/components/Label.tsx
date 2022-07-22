import { Show, JSXElement } from "solid-js";

interface Props {
  children: JSXElement;
  required?: boolean;
  for: HTMLLabelElement["htmlFor"];
}

export function Label({ children, required = false, for: htmlFor }: Props) {
  return (
    <label for={htmlFor} class="block text-sm font-medium text-slate-700">
      {children}
      <Show when={required}>
        <span class="text-blue-500">*</span>
      </Show>
    </label>
  );
}
