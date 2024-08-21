import React, { useState } from 'react';
import { PlusCircleIcon, ArrowPathIcon } from '@heroicons/react/20/solid';

interface TaskInputProps {
  isLoading: boolean;
  onAddTask: (title: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, isLoading }) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    onAddTask(taskTitle);
    setTaskTitle('');
    setError(''); 
  };

  return (
    <div className="flex flex-col space-y-2 mb-6">
      <div className="flex">
        <input
          type="text"
          placeholder="Add a new task..."
          className={`p-3 border rounded w-full focus:ring-2 ${ error ? 'focus:ring-red-500 border-red-300' : 'focus:ring-indigo-500 border-gray-300'} focus:outline-none`}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button disabled={isLoading} onClick={handleAddTask} className="ml-2 bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-all duration-200 flex items-center">
        {isLoading ? (
          <ArrowPathIcon className="animate-spin h-6 w-14 ml-1 mr-1 text-white" />
        ) : (
          <>
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Add
          </>
        )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TaskInput;
