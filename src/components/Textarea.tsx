export function Textarea(props: HTMLTextAreaElement) {
  return (
    <textarea
      rows="4"
      name={props.name}
      id={props.id}
      placeholder={props.placeholder || ""}
      value={props.value}
      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded"
    />
  );
}
