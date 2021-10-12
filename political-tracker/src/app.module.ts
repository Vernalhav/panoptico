import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongresspeopleController } from './congressperson/congresspeople.controller';
import { CongresspersonService } from './congressperson/congressperson.service';
import PartyEntity from './party/entities/party.entity';
import { PartyService } from './party/party.service';
import { PartiesController } from './party/parties.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite3',
      entities: [PartyEntity]
    }),
    TypeOrmModule.forFeature([PartyEntity])
  ],
  controllers: [AppController, CongresspeopleController, PartiesController],
  providers: [AppService, CongresspersonService, PartyService],
})
export class AppModule {}
