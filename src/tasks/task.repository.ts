import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatusE } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
    const { search, status } = filterDTO;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      ); // TODO: Find out this syntax in typeorm system
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(creteTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = creteTaskDTO;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatusE.OPEN;
    await task.save();
    return task;
  }
}
