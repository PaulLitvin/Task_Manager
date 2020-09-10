import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatusE } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses: TaskStatusE[] = [
    TaskStatusE.DONE,
    TaskStatusE.IN_PROGRESS,
    TaskStatusE.OPEN,
  ];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      return new BadRequestException(`{ ${value} } is not valid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
