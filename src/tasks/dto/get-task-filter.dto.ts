import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatusE } from '../task-status.enum';

export class GetTaskFilterDTO {
  @IsOptional()
  @IsIn([TaskStatusE.DONE, TaskStatusE.IN_PROGRESS, TaskStatusE.OPEN])
  status: TaskStatusE;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
