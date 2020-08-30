import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatusE } from './../task.model';

export class GetTaskFilterDTO {
    @IsOptional()
    @IsIn([TaskStatusE.DONE, TaskStatusE.IN_PROGRESS, TaskStatusE.OPEN])
    status: TaskStatusE;

    @IsOptional()
    @IsNotEmpty()
    search: string;  
}