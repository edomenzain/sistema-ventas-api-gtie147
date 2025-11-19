import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import express from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UtilsService } from 'src/shared/services/utils/utils.service';

@Controller('api/user')
@UseGuards(AuthGuard)
export class UserController {

    constructor(private userSvc: UserService, private utilSvc: UtilsService) {}

    @Get()
    getUsers(@Req() request: express.Request) {
        const user = request['user'];
        return this.userSvc.getUsers(user.id);
    }

    @Post()
    async insertUser(@Body() user: CreateUserDto) {

        // Verificar que el username no exista
        const usernames = await this.userSvc.verifyUsername(user.username);
        if (usernames.length > 0) {
            throw new BadRequestException("El nombre de usuario ya existe");
        }

        // Encriptar la contraseña
        var encryptedText = await this.utilSvc.hashPassword(user.password);
        user.password = encryptedText;

        // Insertar la data
        return this.userSvc.insert(user);
    }

    @Put()
    updateUser(): string {
        return this.userSvc.update();
    }

    @Delete()
    deleteUser(): string {
        return this.userSvc.delete();
    }
}
