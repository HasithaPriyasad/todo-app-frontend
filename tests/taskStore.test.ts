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

  it('should add a task and update the state', async () => {
    const task: Task = { id: '2', title: 'New Task', status: TaskStatus.NOTDONE };
    (taskService.createTask as jest.Mock).mockResolvedValue(task);
  
    const store = useTaskStore.getState();
    await act(async () => {
      await store.addTask(task);
    });
    const updatedStore = useTaskStore.getState();
    expect(updatedStore.tasks).toEqual([{id: "1", status: TaskStatus.NOTDONE, title: "Test Task"},{...task}]);
  });
  it('should remove a task and update the state', async () => {
    const taskId = '1';
    (taskService.deleteTask as jest.Mock).mockResolvedValue(undefined);

    const store = useTaskStore.getState();
    store.tasks = [{ id: taskId, title: 'Task to Remove', status: TaskStatus.NOTDONE }];
  
    await act(async () => {
      await store.removeTask(taskId);
    });

    expect(store.tasks).not.toContainEqual([{ id: taskId, title: 'Task to Remove', status: TaskStatus.NOTDONE }]);
  });
});
