import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as taskService from '../services/taskService';
import { Task } from '../types/Task';

export const useTasks = (searchTerm: string) => {
  return useQuery<Task[]>(['tasks', searchTerm], () => taskService.getTasks(searchTerm), {
    keepPreviousData: true,
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation(taskService.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation(taskService.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};
