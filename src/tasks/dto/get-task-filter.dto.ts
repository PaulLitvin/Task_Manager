import { TaskStatusE } from './../task.model';

export class GetTaskFilterDTO {
    search: string;
    status: TaskStatusE
}