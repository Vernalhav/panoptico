import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../data/database.sqlite3',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
