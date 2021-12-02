import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Subject, Vote, VoteByParty } from "src/entities";
import { SubjectDTO, VoteDTO, VotingDTO } from "src/shared/dto";
import { Between, In, Raw, Repository } from "typeorm";
import { SubjectService } from "./subject.service";

@Injectable()
export class SubjectsMonitorService {
  
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>
  ) {}

  async getSubjectsByParties(
    partiesIds: number[],
    subjectsIds: number[],
    startDate: string, 
    endDate: string
  ): Promise<Map<string,SubjectDTO>> {
    
    // Obs: using custom query because of TypeORM limitations :c
    const partiesVotes = await this.subjectsRepository.createQueryBuilder()
    .select(['s.id subjectId', 's.name subjectName', '"party" entity',  'p.id entityId', 'p.name entityName', 'SUM(vbp.yes) yes', 'SUM(vbp.no) no', 'SUM(vbp.other) other'])
    .from('Subject', 's')
    .innerJoin('VotingSubject', 'vs', 'vs.subjectId = s.id')
    .innerJoin('Voting', 'v', 'vs.votingId = v.id AND v.date BETWEEN :start AND :end', { start: startDate, end: endDate })
    .innerJoin('VoteByParty', 'vbp', 'vbp.votingId = v.id AND vbp.partyId IN (:...partiesIds)', { partiesIds: partiesIds })
    .innerJoin('Party', 'p', 'vbp.partyId = p.id')
    .where({ id: In(subjectsIds) })
    .groupBy('s.id, p.id')
    .getRawMany() as { subjectId: number, subjectName: string, entity: string, entityId: number, entityName: string, yes: number, no: number, other: number }[]

    const groupBySubject = partiesVotes.reduce((subjects, party) => { 

      if(subjects[party.subjectId] === undefined){
        subjects[party.subjectId] = new SubjectDTO(party.subjectId, party.subjectName, [])
      }

      subjects[party.subjectId].votes.push(new VoteDTO(
        'party', 
        party.entityId, 
        party.entityName, 
        party.yes, 
        party.no, 
        party.other
      ));

      return subjects;

    }, new Map<string,SubjectDTO>());

    return groupBySubject;
  }

  async getSubjectsByCongresspeople(
    congresspersonIds: number[],
    subjectsIds: number[],
    startDate: string, 
    endDate: string
  ): Promise<Map<string,SubjectDTO>> {
    
    // Obs: using custom query because of TypeORM limitations :c
    const congressVotes = await this.subjectsRepository.createQueryBuilder()
    .select(['s.id subjectId', 's.name subjectName', '"congressperson" entity',  'c.id entityId', 'c.name entityName', 'SUM(vt.yes) yes', 'SUM(vt.no) no', 'SUM(vt.other) other'])
    .from('Subject', 's')
    .innerJoin('VotingSubject', 'vs', 'vs.subjectId = s.id')
    .innerJoin('Voting', 'v', 'vs.votingId = v.id AND v.date BETWEEN :start AND :end', { start: startDate, end: endDate })
    .innerJoin('Vote', 'vt', 'vt.votingId = v.id AND vt.congresspersonId IN (:...congresspersonIds)', { congresspersonIds: congresspersonIds })
    .innerJoin('Congressperson', 'c', 'vt.congresspersonId = c.id')
    .where({ id: In(subjectsIds) })
    .groupBy('s.id, c.id')
    .getRawMany() as { subjectId: number, subjectName: string, entity: string, entityId: number, entityName: string, yes: number, no: number, other: number }[]

    const groupBySubject = congressVotes.reduce((subjects, congressperson) => { 

      if(subjects[congressperson.subjectId] === undefined){
        subjects[congressperson.subjectId] = new SubjectDTO(congressperson.subjectId, congressperson.subjectName, [])
      }

      subjects[congressperson.subjectId].votes.push(new VoteDTO(
        'congressperson', 
        congressperson.entityId, 
        congressperson.entityName, 
        congressperson.yes, 
        congressperson.no, 
        congressperson.other
      ));

      return subjects;

    }, new Map<string,SubjectDTO>());

    return groupBySubject;
  }

  async getVotingsByEntities(
    congresspersonIds: number[],
    partiesIds: number[],
    subjectsIds: number[],
    startDate: string, 
    endDate: string
  ): Promise<Map<string,SubjectDTO>> {
    
    let partiesSubjects: Map<string,SubjectDTO> = await this.getSubjectsByParties(partiesIds, subjectsIds, startDate, endDate);
    let congressSubjects: Map<string,SubjectDTO> = await this.getSubjectsByCongresspeople(congresspersonIds, subjectsIds, startDate, endDate);
    
    // Merge results into congressSubjects
    Object.keys(partiesSubjects).forEach((key) => { 
      if(congressSubjects[key] === undefined){
        congressSubjects[key] = partiesSubjects[key]
      } else {
        console.log(congressSubjects[key].votes)
        congressSubjects[key].votes = congressSubjects[key].votes.concat(partiesSubjects[key].votes)
      }
    });
    
    return congressSubjects;
  }

}