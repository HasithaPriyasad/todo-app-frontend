import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { Task } from '../../types/Task';
import { TaskStatus } from '../../enums/taskStatus';
import { DEFAULT_TASK } from '../../constants/defaultTask';

interface TaskListProps {
  tasks: Task[] | undefined;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange, onDelete, searchQuery }) => {
  return (
    <ul className="space-y-3">
      {tasks !== undefined && tasks.length > 0 ? tasks?.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      )):
        searchQuery === '' && <TaskItem  key={1} task={DEFAULT_TASK} />
      }
    </ul>
  );
};

export default TaskList;
