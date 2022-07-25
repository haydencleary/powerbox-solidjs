import { createSignal, Show, batch } from "solid-js";

import { tasks, deleteTask } from "./stores/taskStore";

import { Layout } from "./components/Layout";
import { Button } from "./components/Button";
import { EditTask } from "./components/EditTask";
// import Graph from '$components/Graph.svelte';
import { ViewTask } from "./components/ViewTask";

const TAB_TASKS = "tasks";
const TAB_GRAPH = "graph";

type Tab = typeof TAB_TASKS | typeof TAB_GRAPH;

export function App() {
  const [tab, setTab] = createSignal<Tab>(TAB_TASKS);
  const [newTask, setNewTask] = createSignal(false);
  const [editing, setEditing] = createSignal<string | null>(null);

  function handleTab(newTab: Tab) {
    setTab(newTab);
  }

  function handleNewTask() {
    batch(() => {
      setNewTask(true);
      setEditing(null);
    });
  }

  function renderTasks() {
    if (tasks.length) {
      // ! Can't use <For> here, otherwise rerender won't trigger when `editing()` changes
      return tasks.map((task) => {
        if (task.id === editing()) {
          return (
            <EditTask
              task={task}
              onCancel={() => {
                setEditing(null);
              }}
            />
          );
        } else {
          return (
            <ViewTask
              task={task}
              onEdit={(id) => {
                batch(() => {
                  setEditing(id);
                  setNewTask(false);
                });
              }}
              onDelete={deleteTask}
            />
          );
        }
      })
    }

    if (!newTask()) {
      return (
        <div class="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <button
            type="button"
            class="relative block w-full border-2 border-slate-300 border-dashed rounded p-12 text-center hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setNewTask(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mx-auto h-12 w-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="mt-2 block text-sm font-medium text-slate-900">
              Create a new task
            </span>
          </button>
        </div>
      );
    }

    return null;
  }

  return (
    <Layout>
      <main class="flex-1 flex overflow-hidden">
        <div class="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden">
          <nav
            aria-label="Menu"
            class="bg-white border-b border-slate-200 lg:hidden"
          >
            <div class="max-w-3xl mx-auto py-3 px-4 flex items-start justify-center sm:px-6 lg:px-8">
              <span class="relative z-0 inline-flex shadow-sm rounded w-full">
                <button
                  type="button"
                  class={`relative w-1/2 inline-flex items-center justify-center px-4 py-2 rounded-l border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    tab() === TAB_TASKS ? "bg-slate-50" : "bg-white"
                  }`}
                  onClick={() => handleTab(TAB_TASKS)}
                >
                  Tasks
                </button>
                <button
                  type="button"
                  class={`-ml-px relative w-1/2 inline-flex items-center justify-center px-4 py-2 rounded-r border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    tab() === TAB_GRAPH ? "bg-slate-50" : "bg-white"
                  }`}
                  onClick={() => handleTab(TAB_GRAPH)}
                >
                  Graph
                </button>
              </span>
            </div>
          </nav>

          <div class="relative flex-1 flex lg:overflow-hidden">
            {/* <!-- Secondary sidebar --> */}
            <div
              aria-label="Sections"
              class="flex-shrink-0 w-full lg:w-96 bg-white border-r border-slate-200 lg:flex lg:flex-col"
              classList={{
                block: tab() === TAB_TASKS,
                hidden: tab() !== TAB_TASKS,
              }}
            >
              <div class="flex-col flex-shrink-0 border-b border-slate-200 flex justify-center">
                <div class="flex items-center justify-between w-full max-w-3xl mx-auto h-16 px-4 sm:px-6">
                  <p class="text-lg font-medium text-slate-900">Tasks</p>
                  <Button onClick={handleNewTask}>New</Button>
                </div>
              </div>
              <div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth">
                {renderTasks()}
                
                <Show when={newTask()}>
                  <EditTask
                    onCancel={() => {
                      setNewTask(false);
                    }}
                  />
                </Show>
              </div>
            </div>

            {/* <!-- Main content --> */}
            <div
              class="flex-1 lg:overflow-y-auto lg:block"
              classList={{
                block: tab() === TAB_GRAPH,
                hidden: tab() !== TAB_GRAPH,
              }}
            >
              <div class="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                {/* <Graph /> */}
                GRAPH
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
