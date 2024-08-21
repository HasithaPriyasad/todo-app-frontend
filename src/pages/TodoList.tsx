import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList/TaskList';
import SearchBar from '../components/SearchBar/SearchBar';
import TaskInput from '../components/TaskInput/TaskInput';
import { useAddTask, useDeleteTask, useTasks, useUpdateTask } from '../hooks/useTasks';
import { TaskStatus } from '../enums/taskStatus';

const TodoList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: tasks, refetch} = useTasks(searchQuery);
  const { isLoading: isTaskLoading, mutate: addTask } = useAddTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  useEffect(() => {
    refetch();
  },[searchQuery,refetch])

  const handleAddTask = (title:string) => {
    addTask({title, status: TaskStatus.NOTDONE});
  };

  const handleStatusChange = (id:string, status: TaskStatus) => {
    updateTask({id, status});
  };

  const handleDeleteTask = (id:string) => {
    deleteTask(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-8">Todo List</h1>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <TaskInput onAddTask={handleAddTask} isLoading={isTaskLoading}/>
        <TaskList tasks={tasks} onStatusChange={handleStatusChange} onDelete={handleDeleteTask}/>
      </div>
    </div>
  );
};

export default TodoList;
