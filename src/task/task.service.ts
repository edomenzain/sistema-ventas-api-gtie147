import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTask } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';

@Injectable()
export class TaskService {

    constructor(private prisma: PrismaService) {}

    private tasks: any[] = [];

    async list() {
        // SELECT * FROM Task;
        return await this.prisma.task.findMany();
    }

    async taskById(idTask: number) {
        // SELECT * FROM Task WHERE id = :id;
        return await this.prisma.task.findFirst({
            where: {
                id : idTask
            }
        });
    }

    async create(task: CreateTask) {
        // INSERT INTO Task VALUES(:description, :status);
        // SELECT * FROM Task WHERE id = inserted_id;
        return await this.prisma.task.create({
            data: task
        });
    }

    async update(id: number, updateTask: UpdateTask) {
        // UPDATE Task SET description = :description, status = :status WHERE id  = :id
        return await this.prisma.task.update({
            where: {
                id: id
            },
            data:  updateTask,
        });
    }

    async delete(id: number) {
        //! - DELETE FROM Task WHERE id = :id
        return await this.prisma.task.delete({
            where: {
                id : id
            }
        });
    }
}

// npm i --save @nestjs/swagger
