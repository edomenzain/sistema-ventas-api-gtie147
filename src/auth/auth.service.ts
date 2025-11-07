import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) { }

    async getUserByUsername(username: string) {
        //! SELECT * FROM User WHERE username = :username;
        return await this.prisma.user.findFirst({
            where: {
                username: username
            }
        });
    }
}
