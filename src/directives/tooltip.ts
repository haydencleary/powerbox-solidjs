import tippy from "tippy.js";
import { onCleanup } from "solid-js";

// Need to do this to make typescript allow `use:tooltip` syntax in jsx
declare module "solid-js" {
  namespace JSX {
    interface Directives {
      tooltip: string;
    }
  }
}

export function tooltip(node: HTMLElement, content: string) {
  const instance = tippy(node, {
    interactive: true,
    content,
  });

  onCleanup(() => {
    instance.destroy();
  });
}
