export interface TasksI {
    id: string;
    title: string;
    description: string;
    status: TaskStatusE;
}

 export enum TaskStatusE {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

