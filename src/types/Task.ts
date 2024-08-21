import { TaskStatus } from "../enums/taskStatus";

export interface Task {
    id: string;
    title: string;
    status: TaskStatus
}
  