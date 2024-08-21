import { useTaskStore } from '../src/store/taskStore';
import * as taskService from '../src/services/taskService';
import { Task } from '../src/types/Task';
import { TaskStatus } from '../src/enums/taskStatus';
import { act } from '@testing-library/react';

jest.mock('../src/services/taskService');
jest.mock('../src/constants/envConstants', () => ({
  VITE_REACT_APP_API_BASE_URL: 'http://localhost:3001',
}));

describe('Task Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch tasks and update the state', async () => {
    const tasks: Task[] = [{ id: '1', title: 'Test Task', status: TaskStatus.NOTDONE }];
    (taskService.getTasks as jest.Mock).mockResolvedValue(tasks);
  
    const store = useTaskStore.getState();
    await act(async () => {
      await store.fetchTasks('searchTerm');
    });
    const updatedStore = useTaskStore.getState();
    expect(updatedStore.tasks).toEqual(tasks);
  });

});
