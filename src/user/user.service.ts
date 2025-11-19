import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async getUsers(id: number) {
        //! SELECT name, lastname, created_at, role FROM user WHERE id != :id
        return await this.prisma.user.findMany({
            select: {
                password: false,
                name: true,
                lastname: true,
                created_at: true,
                role: true
            },
            where: {
                id: {
                    not: id
                }
            }
        });
    }

    async verifyUsername(username: string) {
        //! SELECT * FROM user WHERE username = :username
        return await this.prisma.user.findMany({
            where: {
                username: username
            }
        });
    }

    async insert(user: CreateUserDto) {
        return await this.prisma.user.create({
            data: user,
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: false,
                created_at: true,
                role: true
            }
        });
    }

    update(): string {
        return 'Actualizar Usuario';
    }

    delete(): string {
        return 'Eliminar Usuario';
    }
    
}
