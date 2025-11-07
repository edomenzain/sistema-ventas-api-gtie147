import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API EDM")
    .setDescription("Api Para Sistema de Ventas")
    .setVersion("1.0")
    .addTag("ventas")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// npm run start:dev

// npm install
// npm install -D
// npm install prisma@6.17.1 --save-dev

/*
model Task {
  id Int @id @default(autoincrement())
  description String
  status Boolean
  created_at DateTime @default(now())
}
*/


//! TODO: La ruta por defecto es '/api/auth'
//! TODO: Generar el modulo 'auth'
//! TODO: Generar el controller 'auth'
//? Generar un 'post' 'iniciarSesion(username, password)'
//! TODO: Generar el service 'auth'

//* Agregar dos nuevos modulos
//? npm install @nestjs/jwt
//? npm install bcrypt

//! FIXME: Instalar los dos modulos en un solo comando
//! FIXME: npm install @nestjs/jwt bcrypt
//! FIXME: npm install @types/bcrypt - (opcional: solo autocompleta vscode)


// TODO: Generar un servicio 'utils' dentro de la carpeta:
// TODO: /shared/services/utils
//! nest g s shared/services/utils --no-spec

//? Generar tablas en prisma
//! npx prisma migrate dev --name init


/* CREAR RUTAS DE USUARIO */
//! TODO: Generar el modulo 'user'
//! TODO: Generar el controller 'user'
//! TODO: Generar el service 'user'
//! Generar el GET, POST, PUT, DELETE
/*
getUsers() {
  return 'Lista de usuarios'
}
*/

//! Se agrega un guard para proteger las rutas
//? nest g guard shared/guards/auth --no-spec