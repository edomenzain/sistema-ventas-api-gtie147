import { Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import express from 'express';

@Controller('api/user')
@UseGuards(AuthGuard)
export class UserController {

    constructor(private userSvc: UserService) {}

    @Get()
    getUsers(@Req() request: express.Request): string {
        const user = request['user'];
        console.log(user);
        return this.userSvc.getUsers();
    }

    @Post()
    insertUser(): string {
        return this.userSvc.insert();
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
