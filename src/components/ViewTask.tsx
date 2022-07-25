import { createSignal, Show } from "solid-js";

import { tooltip as tooltipDirective } from "../directives/tooltip";

// This is used below as `use:tooltip`, having to reassign is weird though.
// https://github.com/solidjs/solid/discussions/845
const tooltip = tooltipDirective;

import { Field } from "./Field";

import { updateTask } from "../stores/taskStore";

import type { Task } from "../types/task";
import { TASK_STATUS_DONE, TASK_STATUS_TODO } from "../types/task";

interface Props {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ViewTask(props: Props) {
  const [openMenu, setOpenMenu] = createSignal(false);

  const isDone = () => props.task.status === TASK_STATUS_DONE;
  const isHighlighted = () => window.location.hash === `#${props.task.id}`;

  function handleStatusChange(e: Event) {
    const target = e.target as HTMLInputElement;
    let newStatus = TASK_STATUS_TODO as Task["status"];

    if (target.checked) {
      newStatus = TASK_STATUS_DONE;
    }

    updateTask({ ...props.task, status: newStatus });
  }

  return (
    <article
      id={props.task.id}
      class={`relative flex border-b border-slate-200 transition justify-center border-r-4 ${
        props.task.obt ? "bg-amber-50" : "hover:bg-blue-50 hover:bg-opacity-50"
      }`}
      classList={{
        "border-r-slate-400": isHighlighted(),
        "border-r-transparent": !isHighlighted(),
      }}
    >
      <div class="flex w-full max-w-3xl px-4 py-6 sm:px-6">
        <div>
          <input
            type="checkbox"
            class="rounded"
            checked={isDone()}
            onChange={handleStatusChange}
          />
        </div>
        <div class="ml-3 w-full space-y-3">
          <div class="flex justify-between items-start">
            <p
              class="font-medium"
              classList={{
                "text-slate-900": !isDone(),
                "text-slate-500": isDone(),
                "line-through": isDone(),
              }}
            >
              {props.task.title}
            </p>

            {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
            <div
              class="relative inline-block text-left"
              classList={{ "z-10": openMenu() }}
            >
              <div>
                <button
                  type="button"
                  class="rounded-full flex items-center text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => {
                    setOpenMenu(!openMenu());
                  }}
                >
                  <span class="sr-only">Open options</span>
                  {/* <!-- Heroicon name: solid/dots-vertical --> */}
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <Show when={openMenu()}>
                {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
                <div
                  class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    <button
                      type="button"
                      class={
                        "w-full flex items-center px-4 py-2 text-sm cursor-pointer text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }
                      onClick={() => {
                        props.onEdit(props.task.id);
                      }}
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      <span class="ml-2">Edit</span>
                    </button>
                    <button
                      type="button"
                      class={
                        "w-full flex items-center px-4 py-2 text-sm cursor-pointer text-red-700 hover:bg-red-100 hover:text-red-900"
                      }
                      onClick={() => {
                        props.onDelete(props.task.id);
                      }}
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span class="ml-2">Delete</span>
                    </button>
                  </div>
                </div>
              </Show>
            </div>
          </div>

          <Show when={props.task.description}>
            <p class="mt-1 text-slate-500 text-sm whitespace-pre-line">
              {props.task.description}
            </p>
          </Show>

          <Show when={!isDone()}>
            <div class="flex items-center justify-between">
              <div class="flex gap-4">
                <Field id={`${props.task.id}_impact`} label="Impact">
                  <meter
                    id={`${props.task.id}_impact`}
                    value={props.task.impact}
                    min="1"
                    max="10"
                    low="3"
                    optimum="5"
                    high="7"
                  >
                    {props.task.impact}/10
                  </meter>
                </Field>

                <Field id={`${props.task.id}_urgency`} label="Urgency">
                  <meter
                    id={`${props.task.id}_urgency`}
                    value={props.task.urgency}
                    min="1"
                    max="10"
                    low="3"
                    optimum="5"
                    high="7"
                  >
                    {props.task.urgency}/10
                  </meter>
                </Field>
              </div>

              <Show when={props.task.obt}>
                <span class="text-amber-400" use:tooltip="One big thing">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </Show>
            </div>
          </Show>
        </div>
      </div>
    </article>
  );
}
