import { getTasks, createTask, updateTask, deleteTask } from '../src/services/taskService';
import { api } from '../src/services/api';
import { TaskStatus } from '../src/enums/taskStatus';

jest.mock('../src/services/api');
jest.mock('../src/constants/envConstants', () => ({
  VITE_REACT_APP_API_BASE_URL: 'http://localhost:3001',
}));

describe('taskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should call api.get with the correct endpoint and search term', async () => {
      const searchTerm = 'example';
      const responseData = [{ id: '1', title: 'Example Task' }];
      const getMock = jest.spyOn(api, 'get').mockResolvedValueOnce({ data: responseData });

      const result = await getTasks(searchTerm);

      expect(getMock).toHaveBeenCalledWith(`/tasks?searchTerm=${searchTerm}`);
      expect(result).toEqual(responseData);
    });
  });

  describe('createTask', () => {
    it('should call api.post with the correct endpoint and task data', async () => {
      const taskData = { title: 'New Task', status: TaskStatus.NOTDONE };
      const responseData = { id: '1', ...taskData };
      const postMock = jest.spyOn(api, 'post').mockResolvedValueOnce({ data: responseData });

      const result = await createTask(taskData);

      expect(postMock).toHaveBeenCalledWith('/tasks', taskData);
      expect(result).toEqual(responseData);
    });
  });

  describe('updateTask', () => {
    it('should call api.patch with the correct endpoint and task data', async () => {
      const taskData = { id: '1', status: TaskStatus.DONE };
      const responseData = { title: 'Example Task', ...taskData };
      const patchMock = jest.spyOn(api, 'patch').mockResolvedValueOnce({ data: responseData });

      const result = await updateTask(taskData);

      expect(patchMock).toHaveBeenCalledWith(`/tasks/${taskData.id}`, taskData);
      expect(result).toEqual(responseData);
    });
  });

  describe('deleteTask', () => {
    it('should call api.delete with the correct endpoint and task ID', async () => {
      const taskId = '1';
      const deleteMock = jest.spyOn(api, 'delete').mockResolvedValueOnce({});
      await deleteTask(taskId);
      expect(deleteMock).toHaveBeenCalledWith(`/tasks/${taskId}`);
    });
  });
});