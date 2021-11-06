import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongresspeopleController } from './congressperson/congresspeople.controller';
import { CongresspersonService } from './congressperson/congressperson.service';
import PartyEntity from './party/entities/party.entity';
import { PartyService } from './party/party.service';
import { PartiesController } from './party/parties.controller';
import CongresspersonEntity from './congressperson/entities/congressperson.entity';
import { VotingService } from './voting/voting.service';
import { VotingController } from './voting/voting.controller';
import { TopicService } from './topics/topic.service';
import { TopicsController } from './topics/topics.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite3',
      entities: [PartyEntity, CongresspersonEntity],
    }),
    TypeOrmModule.forFeature([PartyEntity, CongresspersonEntity]),
  ],
  controllers: [AppController, CongresspeopleController, PartiesController, VotingController, TopicsController],
  providers: [AppService, CongresspersonService, PartyService, VotingService, TopicService],
})
export class AppModule {}
