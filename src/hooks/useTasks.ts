import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as taskService from '../services/taskService';
import { Task } from '../types/Task';

export const useTasks = (searchTerm: string) => {
  return useQuery<Task[]>(['tasks', searchTerm], () => taskService.getTasks(searchTerm), {
    keepPreviousData: true,
  });
};

};
