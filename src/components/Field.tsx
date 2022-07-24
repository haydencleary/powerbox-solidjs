import { JSX } from "solid-js/jsx-runtime";

import { Label } from "./Label";
import type { LabelProps } from "./Label";

interface Props extends Omit<LabelProps, "for"> {
  label: JSX.Element;
  id: LabelProps["for"];
}

export function Field({ children, id, required = false, label }: Props) {
  return (
    <div>
      <Label for={id} required={required}>
        {label}
      </Label>
      <div class="mt-1">{children}</div>
    </div>
  );
}
