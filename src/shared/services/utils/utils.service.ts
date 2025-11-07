import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/constants/jwt.constants';

@Injectable()
export class UtilsService {

    constructor(private jwtSvc: JwtService) { }

    //! generar un método para encriptar la contraseña
    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    //! Crear un método para verificar la contraseña encriptada
    async verifyPassword(password: string, encryptedPassword: string) {
        return await bcrypt.compareSync(password, encryptedPassword);
    }

    //! crear un método para generar el token de acceso (JWT)
    async generateJWT(payload: any) {
        var jwt = await this.jwtSvc.signAsync(payload, {
            secret: jwtConstants.secret
        });

        return jwt;
    }
    
    //! crear un método para obtener la infomación del token (payload)
    async getPayload(jwt: string) {
        var payload = await this.jwtSvc.verifyAsync(jwt, {
            secret: jwtConstants.secret
        });
        const { iat, exp, ...data} = payload;
        
        return data;
    }

}
