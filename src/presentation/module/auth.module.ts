import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth/auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
