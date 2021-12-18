import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CongresspersonController,
  LawCountMonitorController,
  PartyController,
  SubjectsMonitorController,
  VotingsMonitorController,
} from './controllers';
import {
  Congressperson,
  LawCountByAuthor,
  LawCountByParty,
  Party,
  Subject,
  Vote,
  VoteByParty,
  Voting,
} from './entities';
import {
  CongresspersonService,
  LawCountMonitorService,
  PartyService,
  SubjectService,
  SubjectsMonitorService,
  VotingsMonitorService,
} from './services';
import {
  CongresspeopleMapper,
  CongresspersonMapper,
  PartiesMapper,
  PartyMapper,
} from './shared/mappers';

@Module({
  controllers: [
    CongresspersonController,
    PartyController,
    VotingsMonitorController,
    SubjectsMonitorController,
    LawCountMonitorController,
  ],

  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite3',
      entities: [
        Party,
        Congressperson,
        Subject,
        Voting,
        Vote,
        VoteByParty,
        LawCountByAuthor,
        LawCountByParty,
      ],
    }),
    TypeOrmModule.forFeature([
      Party,
      Congressperson,
      Subject,
      Voting,
      Vote,
      VoteByParty,
      LawCountByAuthor,
      LawCountByParty,
    ]),
  ],

  providers: [
    // Services
    PartyService,
    SubjectService,
    CongresspersonService,
    VotingsMonitorService,
    SubjectsMonitorService,
    LawCountMonitorService,

    // Mappers
    PartyMapper,
    CongresspersonMapper,
    PartiesMapper,
    CongresspeopleMapper,
  ],
})
export class AppModule {}
