import { Injectable } from '@nestjs/common';
import { getConnection, Between } from 'typeorm';
import { TopicService } from '../topics/topic.service';

@Injectable()
export class VotingService {
  
  constructor(private topicService: TopicService) {}

  private buildGroupByVotingQuery(partiesIds: number[],
            congresspersonIds: number[], 
            subjects: string[],
            startDate: string,
            endDate: string,
            maxItems: number = 5) {
            
    const query = getConnection().manager.createQueryBuilder()
                    .select(['v.idVotacao', 'pV.dataVotacao', 'COUNT(*) as total'])
                    .addSelect(`'[' || group_concat(DISTINCT '"' || t.nome || '"') || ']'`, 'temas')
                    .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
                    .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
                    .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
                    .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
                    .from('votos', 'v')
                    .innerJoin('proposicoesVotacoes', 'pV', 'v.idVotacao = pV.idVotacao AND pV.dataVotacao BETWEEN :start AND :end', {
                      'start': startDate,
                      'end': endDate
                    })
                    .innerJoin('proposicoesTemas', 'pT', 'pV.idProposicao = pT.idProposicao')
                    .innerJoin('topicos', 't', `pT.idTopico = t.id AND (t.nome IN (:...topics))`, {
                      'topics': subjects,
                    });

      if (partiesIds.length > 0 || congresspersonIds.length > 0) {
        query.innerJoin('deputados', 'd', 'd.id = v.idDeputado AND (d.id IN (:...congresspeople) OR d.idPartido IN (:...parties))', {
                      'congresspeople': congresspersonIds,
                      'parties': partiesIds
                    });
      }

      query.groupBy('v.idVotacao')
                    .addGroupBy('pv.dataVotacao')
                    .limit(maxItems);
    
    return query;
  }

  async getAll(partiesIds: number[] = [],
                congresspersonIds: number[] = [],
                subjects: string[] = [],
                regexSubjects: string[] = ['.*'] ,
                startDate = '2019-01-01',
                endDate = '2021-12-30') {

    const filteredSubjects = await this.topicService.getByRegexList(regexSubjects);
    subjects = subjects.concat(filteredSubjects);

    const query = this.buildGroupByVotingQuery(partiesIds, congresspersonIds, subjects, startDate, endDate);
    console.log(query.getSql());
    
    const data = await query.getRawMany();
    data.forEach(element => {
      element.temas = JSON.parse(element.temas)
    });;

    return data;
  }
}
