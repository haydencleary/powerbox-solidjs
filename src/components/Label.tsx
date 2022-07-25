import { Show, JSXElement } from "solid-js";

export interface LabelProps {
  children: JSXElement;
  required?: boolean;
  for: HTMLLabelElement["htmlFor"];
}

export function Label(props: LabelProps) {
  const required = () => props.required || false;

  return (
    <label for={props.for} class="block text-sm font-medium text-slate-700">
      {props.children}
      <Show when={required()}>
        <span class="text-blue-500">*</span>
      </Show>
    </label>
  );
}
