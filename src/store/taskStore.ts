import { create } from 'zustand';
import { Task } from '../types/Task';
import * as taskService from '../services/taskService';

interface TaskState {
  tasks: Task[];
  fetchTasks: (searchTerm: string) => Promise<void>;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  
  fetchTasks: async (searchTerm: string) => {
    const tasks = await taskService.getTasks(searchTerm);
    set({ tasks });
  },
  
  addTask: async (todoTask) => {
    const task = await taskService.createTask(todoTask);
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  
  updateTask: async (task) => {
    await taskService.updateTask(task);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
  },
  
  removeTask: async (taskId) => {
    await taskService.deleteTask(taskId);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));
