import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UtilsService } from 'src/shared/services/utils/utils.service';

@Controller('api/auth')
export class AuthController {

    constructor(private authSvc: AuthService, private utilSvc: UtilsService) {}

    @Post()
    async login(@Body() data: AuthDto) {
        const { username, password } = data;

        //* var encryptedPassword = await this.utilSvc.hashPassword(password);
        //* console.log(encryptedPassword);

        // Verificar que el usuario existe por medio del username
        const user = await this.authSvc.getUserByUsername(username);

        // Si el usuario no existe devolver un mensaje de error
        if (!user) throw new BadRequestException('El usuario y/o contraseña es incorrecto');

        // Verificar la contraseña
        const verify = await this.utilSvc.verifyPassword(password, user.password);
        if (verify) {
            // Si la contraseña es correcta devolver un JWT
            const { password, ...payload } = user;

            // Generar JWT
            const jwt = await this.utilSvc.generateJWT(payload);

            // enviar el JWT
            return { token : jwt }
        } else {
            throw new BadRequestException('El usuario y/o contraseña es incorrecto');
        }

    }
}
