import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtSvc: JwtService) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Obtener el payload del token
      const payload = await this.jwtSvc.verifyAsync(token, { secret: jwtConstants.secret });
      
      // Agregar el usuario a la petición
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
