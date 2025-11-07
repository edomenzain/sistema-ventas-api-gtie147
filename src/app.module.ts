import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UtilsService } from './shared/services/utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, UtilsService, JwtService],
})
export class AppModule {}
