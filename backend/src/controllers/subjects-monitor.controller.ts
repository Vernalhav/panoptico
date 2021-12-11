import { Controller, Get, Query } from '@nestjs/common';
import { SubjectService, SubjectsMonitorService } from 'src/services';
import { SubjectsMonitorResponseDTO } from 'src/shared/dto';
import { arrayOrElementToArray } from 'src/shared/utils';

@Controller('subjects-monitor')
export class SubjectsMonitorController {
  constructor(
    private subjectService: SubjectService,
    private subjectsMonitorService: SubjectsMonitorService,
  ) {}

  @Get()
  async entitiesActivities(
    @Query('startDate') startDate = '2019-01-01',
    @Query('endDate') endDate = '2021-12-30',
    @Query('subjects') subjects: string[] | string = [],
    @Query('regexSubjects') regexSubjects: string[] | string = [],
    @Query('partiesIds') partiesIds: number[] | number = [],
    @Query('congresspersonIds') congresspersonIds: number[] | number = [],
  ): Promise<SubjectsMonitorResponseDTO> {
    partiesIds = arrayOrElementToArray(partiesIds);
    congresspersonIds = arrayOrElementToArray(congresspersonIds);
    subjects = arrayOrElementToArray(subjects);
    regexSubjects = arrayOrElementToArray(regexSubjects);

    const subjectsIds = (
      await this.subjectService.getFilteredByName(subjects, regexSubjects)
    ).map((s) => s.id);

    return new SubjectsMonitorResponseDTO(
      Object.values(
        await this.subjectsMonitorService.getVotingsByEntities(
          congresspersonIds,
          partiesIds,
          subjectsIds,
          startDate,
          endDate,
        ),
      ),
    );
  }

  @Get('parties')
  async partiesActivities(
    @Query('startDate') startDate = '2019-01-01',
    @Query('endDate') endDate = '2021-12-30',
    @Query('subjects') subjects: string[] | string = [],
    @Query('regexSubjects') regexSubjects: string[] | string = [],
    @Query('partiesIds') partiesIds: number[] | number = [],
  ): Promise<SubjectsMonitorResponseDTO> {
    partiesIds = arrayOrElementToArray(partiesIds);
    subjects = arrayOrElementToArray(subjects);
    regexSubjects = arrayOrElementToArray(regexSubjects);

    const subjectsIds = (
      await this.subjectService.getFilteredByName(subjects, regexSubjects)
    ).map((s) => s.id);

    return new SubjectsMonitorResponseDTO(
      Object.values(
        await this.subjectsMonitorService.getSubjectsByParties(
          partiesIds,
          subjectsIds,
          startDate,
          endDate,
        ),
      ),
    );
  }

  @Get('congresspeople')
  async congresspeopleActivities(
    @Query('startDate') startDate = '2019-01-01',
    @Query('endDate') endDate = '2021-12-30',
    @Query('subjects') subjects: string[] | string = [],
    @Query('regexSubjects') regexSubjects: string[] | string = [],
    @Query('congresspersonIds') congresspersonIds: number[] | number = [],
  ): Promise<SubjectsMonitorResponseDTO> {
    congresspersonIds = arrayOrElementToArray(congresspersonIds);
    subjects = arrayOrElementToArray(subjects);
    regexSubjects = arrayOrElementToArray(regexSubjects);

    const subjectsIds = (
      await this.subjectService.getFilteredByName(subjects, regexSubjects)
    ).map((s) => s.id);

    return new SubjectsMonitorResponseDTO(
      Object.values(
        await this.subjectsMonitorService.getSubjectsByCongresspeople(
          congresspersonIds,
          subjectsIds,
          startDate,
          endDate,
        ),
      ),
    );
  }
}
