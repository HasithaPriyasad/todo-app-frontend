import { api } from './api';
import { Task } from '../types/Task';

export const getTasks = async (searchTerm: string): Promise<Task[]> => {
  const response = await api.get(`/tasks?searchTerm=${searchTerm}`);
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.post('/tasks', task);
  return response.data;
};
export const deleteTask = async (taskId: string): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};
