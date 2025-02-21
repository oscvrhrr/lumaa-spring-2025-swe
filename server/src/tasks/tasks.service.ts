import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ITask } from 'src/types/Task';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(title: string, description: string, userId: number) {
    await this.prisma.tasks.create({
      data: {
        title,
        description,
        userId,
      },
    });
    return;
  }

  async findAll(id: number) {
    const allTasks = await this.prisma.tasks.findMany({
      where: {
        userId: id,
      },
    });
    return allTasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, userId: number, data: ITask) {
    const updatedTask = await this.prisma.tasks.update({
      where: {
        id,
        userId,
      },
      data: {
        title: data.title,
        description: data.description,
        isComplete: data.isComplete,
      },
    });
    return updatedTask;
  }

  async remove(id: number, userId: number) {
    await this.prisma.tasks.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
