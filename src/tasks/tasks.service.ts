import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatusE } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { DeleteResult } from 'typeorm';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
    console.log(filterDTO);

    return this.taskRepository.getTasks(filterDTO);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID { ${id} } not found`);
    }

    return found;
  }

  async createTask(creteTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(creteTaskDTO);
  }

  async deleteTask(id: number): Promise<void> {
    const removedTask: DeleteResult = await this.taskRepository.delete(id);

    if (removedTask.affected === 0) {
      throw new NotFoundException(`Task with ID { ${id} } not found`);
    }
  }
  async updateTask(id: number, status: TaskStatusE): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    task.save();
    return task;
  }
}
