export function Textarea({name, id, placeholder = "", value} : HTMLTextAreaElement) { 
	return <textarea
	rows="4"
	name={name}
	id={id}
	placeholder={placeholder}
	value={value}
	class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded"
/>
}