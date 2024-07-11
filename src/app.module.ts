import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthController } from './presentation/controller/auth/auth.controller';
import { ConcertController } from './presentation/controller/concert/concert.controller';
import { PaymentController } from './presentation/controller/payment/payment.controller';
import { UserController } from './presentation/controller/user/user.controller';
import { AuthModule } from './presentation/module/auth.module';
import { ConcertModule } from './presentation/module/concert.module';
import { PaymentModule } from './presentation/module/payment.module';
import { UserModule } from './presentation/module/user.module';

@Module({
  imports: [ConcertModule, AuthModule, UserModule, PaymentModule],
  controllers: [
    ConcertController,
    AuthController,
    UserController,
    PaymentController,
  ],
  providers: [AppService],
})
export class AppModule {}
