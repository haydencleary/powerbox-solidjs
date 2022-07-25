import { Badge } from "./Badge";
import { Button } from "./Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { Range } from "./Range";
import { Textarea } from "./Textarea";

import { createTask, updateTask, tasks } from "../stores/taskStore";

import type { Task } from "../types/task";
import { TASK_STATUS_DONE } from "../types/task";

const INITIAL_TASK: Task = {
  id: "",
  title: "",
  description: "",
  status: "todo",
  urgency: "5",
  impact: "5",
  obt: false,
};

interface Props {
  task?: Task;
  onCancel: () => void;
}

export function EditTask(props: Props) {
  const task = () => props.task || INITIAL_TASK;
  const isDone = () => task().status === TASK_STATUS_DONE;
  const urgencyStr = () => task().urgency.toString();
  const impactStr = () => task().impact.toString();

  const disableObt = tasks.filter((task) => task.obt).length > 0;

  function handleSubmit(e: Event) {
    const formData = new FormData(e.target as HTMLFormElement);

    // If the `obt` checkbox isn't checked, no value is returned.
    // We also want the value to be a boolean so we have to set it manually, as inputs return strings or numbers.
    let obt = false;

    if (formData.has("obt")) {
      obt = true;
    }

    // Need to set any here because TypeScript doesn't know how to handle formData.entries()
    // const taskEntries = Object.fromEntries(
    // 	[...(<any>formData).entries()].map(([name, value]) => [name, value.trim()])
    // );

    // Override any `obt` value that may be returned in `taskEntries`.
    const submittedTask = { ...task, ...taskEntries, obt };

    if (submittedTask.id) {
      updateTask(submittedTask);
    } else {
      createTask(submittedTask);
    }

    // Close form
    handleCancel();
  }

  function handleCancel() {
    props.onCancel();
  }

  return (
    <form
      class="hover:bg-blue-50 hover:bg-opacity-50 border-b border-slate-200"
      onSubmit={handleSubmit}
      // use:scrollIntoView
    >
      <div class="max-w-3xl mx-auto px-4 py-6 sm:px-6">
        <div class="space-y-3">
          <Field id="edit_task_title" label="Title" required>
            <Input
              id="edit_task_title"
              name="title"
              value={task().title}
              required
              autofocus
              pattern=".*\S+.*"
            />
          </Field>

          <Field id="edit_task_description" label="Description">
            <Textarea
              id="edit_task_description"
              name="description"
              value={task().description}
            />
          </Field>

          <Field id="edit_task_impact" label="Impact">
            <Range id="edit_task_impact" name="impact" value={impactStr()} />
          </Field>

          <Field id="edit_task_urgency" label="Urgency">
            <Range id="edit_task_urgency" name="urgency" value={urgencyStr()} />
          </Field>

          <div class="flex items-center">
            <label class="flex items-center text-slate-700">
              <input
                type="checkbox"
                name="obt"
                class="rounded mr-2"
                checked={task().obt}
                disabled={disableObt && !task().obt}
              />
              One big thing
            </label>
            <span
              class="inline-flex text-slate-400 hover:text-slate-500 ml-2 rounded-full"
              tabindex="0"
              // use:tooltip={{
              // 	content: 'The most important task to complete. Only one allowed at a time.'
              // }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="mt-6 flex justify-between items-center">
          <Badge variant={isDone() ? "done" : "todo"}>
            {isDone() ? "Done" : "Todo"}
          </Badge>

          <div class="flex space-x-3">
            <Button type="reset" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
