import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongresspeopleController } from './congressperson/congresspeople.controller';
import { CongresspersonService } from './congressperson/congressperson.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite3',
    }),
  ],
  controllers: [AppController, CongresspeopleController],
  providers: [AppService, CongresspersonService],
})
export class AppModule {}
