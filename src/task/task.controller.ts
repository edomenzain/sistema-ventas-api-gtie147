import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateTask } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';

@Controller('task')
export class TaskController {

    constructor(private taskSvc: TaskService){ }

    @Get()
    @ApiOperation({
        summary: 'Get All tasks from database',
        description: 'Get All tasks from database'
    })
    async listTasks() {
        return await this.taskSvc.list();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get Task by Id from database',
        description: 'Get Task by Id from database'
    })
    async findTaskById(@Param('id', ParseIntPipe) id: number) {
        const task = await this.taskSvc.taskById(id);

        if (!task) throw new BadRequestException(`La tarea con id: ${id} no existe`);

        return task;
    }

    @Post()
    @ApiOperation({
        summary: 'Create task into database',
        description: 'Create task into database'
    })
    async createTask(@Body() task: CreateTask) {
        return await this.taskSvc.create(task);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update task into database',
        description: 'Create task into database'
    })
    async updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTask: UpdateTask) {
        // Se verifica que exista la tarea, en caso de que no exista devolver un error 404
        const task = await this.taskSvc.taskById(id);
        if (!task) throw new NotFoundException(`La tarea con id: ${id} no existe`);

        // Actualizar la información y devolver el usuario actualizado
        return await this.taskSvc.update(id, updateTask);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete task by Id into database',
        description: 'Delete task by Id into database'
    })
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        
        // Se verifica que exista la tarea, en caso de que no exista devolver un error 404
        const task = await this.taskSvc.taskById(id);
        if (!task) throw new NotFoundException(`La tarea con id: ${id} no existe`);

        return await this.taskSvc.delete(id);
    }
}

// Iniciar proyecto
// npm run start:dev
