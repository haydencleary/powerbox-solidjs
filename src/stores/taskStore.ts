import { createStore } from "solid-js/store";

import type { Task } from "../types/task";

let initialTasks: Task[] = [];

const storedTasks = window.localStorage.getItem("tasks");

if (storedTasks) {
  initialTasks = JSON.parse(storedTasks);
}

const [tasks, setTasks] = createStore(initialTasks);

export const createTask = (newTask: Task) => {
  setTasks((store) => {
    const updated = [...store, { ...newTask, id: Date.now().toString() }];

    window.localStorage.setItem("tasks", JSON.stringify(updated));

    return updated;
  });
};

export const updateTask = (updatedTask: Task) => {
  setTasks((store) => {
    const updated = store.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }

      return task;
    });

    window.localStorage.setItem("tasks", JSON.stringify(updated));

    return updated;
  });
};

export const deleteTask = (id: string) => {
  setTasks((store) => {
    const updated = store.filter((task) => task.id !== id);

    window.localStorage.setItem("tasks", JSON.stringify(updated));

    return updated;
  });
};

export { tasks };
