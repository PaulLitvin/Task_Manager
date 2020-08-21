import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksI, TaskStatusE } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { TaskStatusValidationP } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
 getTasks(@Query() filterDTO: GetTaskFilterDTO): TasksI[] {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getFilteredTasks(filterDTO);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): TasksI {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() creteTaskDTO: CreateTaskDTO): TasksI {
    return this.tasksService.createTask(creteTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationP) status: TaskStatusE,
  ): TasksI {
    return this.tasksService.updateTask(id, status);
  }
}
