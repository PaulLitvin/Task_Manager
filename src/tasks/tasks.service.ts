import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { User } from './../auth/user.entity';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatusE } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTaskFilterDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID { ${id} } not found`);
    }

    return found;
  }

  async createTask(creteTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(creteTaskDTO, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const removedTask: DeleteResult = await this.taskRepository.delete({
      id,
      userId: user.id,
    });

    if (removedTask.affected === 0) {
      throw new NotFoundException(`Task with ID { ${id} } not found`);
    }
  }
  async updateTask(id: number, status: TaskStatusE, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    task.save();
    return task;
  }
}
