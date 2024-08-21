import { TaskStatus } from "../enums/taskStatus";
import { Task } from "../types/Task";

export const DEFAULT_TASK: Task = {id: "DEFAULT_ID", title: "Create todo list", status: TaskStatus.DONE};