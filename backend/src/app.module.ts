import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongresspersonController, PartyController, SubjectsMonitorController, VotingsMonitorController } from './controllers';
import { Congressperson, Party, Subject, Vote, VoteByParty, Voting } from './entities';
import { CongresspersonService, PartyService, SubjectService, SubjectsMonitorService, VotingsMonitorService } from './services';
import { CongresspeopleMapper, CongresspersonMapper, PartiesMapper, PartyMapper } from './shared/mappers';


@Module({
  controllers: [ 
    CongresspersonController, 
    PartyController,
    VotingsMonitorController,
    SubjectsMonitorController,

  ],

  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite3',
      entities: [Party, Congressperson, Subject, Voting, Vote, VoteByParty]
    }),
    TypeOrmModule.forFeature([Party, Congressperson, Subject, Voting, Vote, VoteByParty]),
  ],

  providers: [
    // Services
    PartyService,
    SubjectService,
    CongresspersonService,
    VotingsMonitorService,
    SubjectsMonitorService,

    // Mappers
    PartyMapper,
    CongresspersonMapper,
    PartiesMapper,
    CongresspeopleMapper,
  ],
})

export class AppModule {}