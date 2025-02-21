import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CustomRequest } from 'src/types/CustomRequest';
import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ITask } from 'src/types/Task';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt')) //GET /tasks
  @Get()
  async getAllTasks(@Req() req: CustomRequest, @Res() res: Response) {
    const { id } = req.user;
    const allTasks = await this.tasksService.findAll(id);
    return res
      .status(200)
      .json({ message: 'successfully sent all task', allTasks });
  }

  @UseGuards(AuthGuard('jwt')) // POST /tasks
  @Post()
  async createNewTask(
    @Req() req: CustomRequest,
    @Body() body: { title: string; description: string },
    @Res() res: Response,
  ) {
    if (req.user) {
      const { id } = req.user;
      const { title, description } = body;
      await this.tasksService.create(title, description, id);
      return res.status(201).json({ message: 'Task created successfully' });
    } else {
      return res.status(401).json({ message: 'User not authnticated' });
    }
  }

  @UseGuards(AuthGuard('jwt')) // PUT /tasks/:id
  @Put(':id')
  async updateExistingTask(
    @Req() req: CustomRequest,
    @Body() body: ITask,
    @Res() res: Response,
  ) {
    const taskid = Number(req.params.id);
    const { id } = req.user;
    const updatedTask = await this.tasksService.update(taskid, id, body);
    return res
      .status(200)
      .json({ message: 'successfully updated task', updatedTask });
  }

  @UseGuards(AuthGuard('jwt')) // DELETE /tasks/:id
  @Delete(':id')
  async deleteTaskById(@Req() req: CustomRequest, @Res() res: Response) {
    const { id } = req.user;
    const taskid = Number(req.params.id);
    await this.tasksService.remove(taskid, id);
    return res.status(204).json({ message: 'removed resource successfully' });
  }
}
