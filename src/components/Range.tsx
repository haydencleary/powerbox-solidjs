export function Range({name, id, value = ''}: HTMLInputElement) {
	return <input
	type="range"
	name={name}
	id={id}
	value={value}
	min="1"
	max="10"
	step="1"
	class="focus:ring-blue-500 focus:border-blue-500 block w-full accent-blue-500"
/>
}