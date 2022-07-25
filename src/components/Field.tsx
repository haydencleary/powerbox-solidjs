import { JSX } from "solid-js/jsx-runtime";

import { Label } from "./Label";
import type { LabelProps } from "./Label";

interface Props extends Omit<LabelProps, "for"> {
  label: JSX.Element;
  id: LabelProps["for"];
}

export function Field(props: Props) {
  const required = () => props.required || false;

  return (
    <div>
      <Label for={props.id} required={required()}>
        {props.label}
      </Label>
      <div class="mt-1">{props.children}</div>
    </div>
  );
}
