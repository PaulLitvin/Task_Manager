import { Injectable } from '@nestjs/common';
// import { TasksI, TaskStatusE } from './task.model';
// import { CreateTaskDTO } from './dto/create-task.dto';
// import { GetTaskFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  // private tasks: TasksI[] = [{id: '1', title: 'Task1', description: 'task 1 description', status: TaskStatusE.OPEN},
  // {id: '2', title: 'Task2', description: 'task 2 description', status: TaskStatusE.IN_PROGRESS},
  // {id: '3', title: 'Task3', description: 'task 3 description', status: TaskStatusE.DONE}];
  // getAllTasks(): TasksI[] {
  //   return this.tasks;
  // }
  // getFilteredTasks(filterDTO: GetTaskFilterDTO): TasksI[] {
  //   const { search, status } = filterDTO;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = this.tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = this.tasks.filter(task => task.description.includes(search));
  //   }
  //   return tasks;
  // }
  // getTaskById(id: string): TasksI {
  //   const found = this.tasks.find(task => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID { ${id} } not found`);
  //   }
  //   return found;
  // }
  // createTask(creteTaskDTO: CreateTaskDTO): TasksI {
  //   const { title, description } = creteTaskDTO;
  //   const task: TasksI = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatusE.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }
  // updateTask(id: string, status: TaskStatusE): TasksI {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
