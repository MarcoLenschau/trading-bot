import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true,}),CoinsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
