import React from 'react';
import { CheckCircleIcon, XCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Task } from '../../types/Task';
import { TaskStatus } from '../../enums/taskStatus';
import { DEFAULT_TASK } from '../../constants/defaultTask';

interface TaskItemProps {
  task: Task;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onDelete?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onDelete }) => {

  const getStatusBtnStyles = (): string => {
    let bgStyles = '';
    if(task.status === TaskStatus.DONE && task.id !== DEFAULT_TASK.id){
      bgStyles = 'bg-yellow-500 hover:bg-yellow-600';
    }else if(task.id === DEFAULT_TASK.id){
      bgStyles = 'bg-gray-500';
    }else{
      bgStyles = 'bg-green-500 hover:bg-green-600';
    }
  
    return `px-4 py-2 rounded text-white flex items-center ${bgStyles} transition-all duration-200`;
  }
          
  return (
    <li className={`flex justify-between items-center p-3 rounded-lg shadow-md transform transition-all duration-300 ${
      task.status === 'DONE' ? 'bg-green-100' : 'bg-red-100'
    }`}>
      <span className={`flex-1 text-lg font-semibold ${
                  task.status === TaskStatus.DONE ? 'line-through text-gray-500' : 'text-gray-800'
                }`} >{task.title}</span>
      <div className="flex space-x-3">
        <button
          disabled={task.id === DEFAULT_TASK.id}
          onClick={() => onStatusChange && onStatusChange(task.id, task.status === TaskStatus.DONE ? TaskStatus.NOTDONE : TaskStatus.DONE)}
          className={getStatusBtnStyles()}
        >
          {task.status === TaskStatus.DONE ? (
            <>
              <XCircleIcon className="h-5 w-5 mr-2" />
              Undo
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Done
            </>
          )}
        </button>
        <button
          disabled={task.id === DEFAULT_TASK.id}
          onClick={() => onDelete && onDelete(task.id)}
          className={`px-4 py-2 ${task.id === DEFAULT_TASK.id ? 'bg-gray-500' : ' bg-red-500 hover:bg-red-600'} text-white rounded  transition-all duration-200 flex items-center`}
        >
          <TrashIcon className="h-5 w-5 mr-2" />
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
