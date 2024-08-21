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

});