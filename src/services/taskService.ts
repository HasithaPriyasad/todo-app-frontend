import { api } from './api';
import { Task } from '../types/Task';

export const getTasks = async (searchTerm: string): Promise<Task[]> => {
  const response = await api.get(`/tasks?searchTerm=${searchTerm}`);
  return response.data;
};

