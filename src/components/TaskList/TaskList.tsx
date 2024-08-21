import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { Task } from '../../types/Task';
import { TaskStatus } from '../../enums/taskStatus';

interface TaskListProps {
  tasks: Task[] | undefined;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange, onDelete }) => {
  return (
    <ul className="space-y-3">
      {tasks?.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
