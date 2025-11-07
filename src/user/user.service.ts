import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    getUsers(): string {
        return 'Lista de Usuarios';
    }

    insert(): string {
        return 'Insertar Usuario';
    }

    update(): string {
        return 'Actualizar Usuario';
    }

    delete(): string {
        return 'Eliminar Usuario';
    }
    
}
