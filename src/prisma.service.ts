import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

// rm -rf node_modules (en caso de que no los deje eliminar manualmente)
//? Eliminar la carpeta /node_module /dist y /generated
//? npm install
//! Modificar el archivo schema.prisma y cambiar el provider
//? npx prisma generate
//! ejecuar el proyecto: npm run start:dev