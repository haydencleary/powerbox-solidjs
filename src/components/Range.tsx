export function Range(props: HTMLInputElement) {
  return (
    <input
      type="range"
      name={props.name}
      id={props.id}
      value={props.value || ""}
      min="1"
      max="10"
      step="1"
      class="focus:ring-blue-500 focus:border-blue-500 block w-full accent-blue-500"
    />
  );
}
