import { Injectable } from '@nestjs/common';
import { getConnection, Between } from 'typeorm';
import { TopicService } from '../topics/topic.service';

@Injectable()
export class VotingService {
  constructor(private topicService: TopicService) {}

  private buildGroupByVotingQuery(
    partiesIds: number[],
    congresspersonIds: number[], 
    subjects: string[],
    startDate: string,
    endDate: string,
    maxItems: number = 20
  ) {
            
    const query = getConnection().manager.createQueryBuilder()
    //Base query
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

    // Filtrar por topicos
    .innerJoin('proposicoesTemas', 'pT', 'pV.idProposicao = pT.idProposicao')
    .innerJoin('topicos', 't', `pT.idTopico = t.id AND (t.nome IN (:...topics))`, {
      'topics': subjects,
    });

    //Filtrar por deputado ou partido
    if (partiesIds.length > 0 || congresspersonIds.length > 0) {
      query.innerJoin('deputados', 'd', 'd.id = v.idDeputado AND (d.id IN (:...congresspeople) OR d.idPartido IN (:...parties))', {
        'congresspeople': congresspersonIds,
        'parties': partiesIds
      });
    }

    // Agrupar por votacao
    query.groupBy('v.idVotacao')
      .addGroupBy('pv.dataVotacao')
      .limit(maxItems);
    
    return query;
  }

  async getAll(
    partiesIds: number[],
    congresspersonIds: number[],
    subjects: string[],
    regexSubjects: string[],
    startDate: string,
    endDate: string
  ) {

    const filteredSubjects = await this.topicService.getByRegexList(regexSubjects);
    subjects = subjects.concat(filteredSubjects);

    const query = this.buildGroupByVotingQuery(partiesIds, congresspersonIds, subjects, startDate, endDate);
    console.log(query.getSql());
    
    const data = await query.getRawMany();
    data.forEach(element => {
      element.temas = JSON.parse(element.temas)
    });

    return data;
  }

  async getByEntities(partiesIds: number[], congresspersonIds: number[], startDate: string, endDate: string) {
    const maxItems = 20;
    const query = getConnection().manager.createQueryBuilder()
      .select(['v.idVotacao', 'pV.dataVotacao', 'COUNT(*) as total'])
      .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
      .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
      .from('votos', 'v')
      .innerJoin('votacoes', 'pV', 'v.idVotacao = pV.idVotacao AND pV.dataVotacao BETWEEN :start AND :end', {
        'start': startDate,
        'end': endDate
      })
      .innerJoin('deputados', 'd', 'd.id = v.idDeputado AND (d.id IN (:...congresspeople) OR d.idPartido IN (:...parties))', {
          'congresspeople': congresspersonIds,
          'parties': partiesIds
        })
      .groupBy('v.idVotacao')
      .limit(maxItems);

    const data = await query.getRawMany();
    
    console.log(query.getSql() + '\n');
    
    return data;
  }

  async getBySubjects(subjects: string[], regexSubjects: string[], startDate: string, endDate: string) {
    
    const filteredSubjects = await this.topicService.getByRegexList(regexSubjects);
    subjects = subjects.concat(filteredSubjects);
    
    const query = getConnection().manager.createQueryBuilder()
      .select(['t.nome AS tema', 'COUNT(*) as total'])
      .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
      .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
      
      .from('topicos', 't')
      .innerJoin('proposicoesTemas', 'pT', `t.id = pT.idTopico`)
      .innerJoin('proposicoesVotacoes', 'pV', 'pT.idProposicao = pV.idProposicao AND pV.dataVotacao BETWEEN :start AND :end', {
        'start': startDate,
        'end': endDate
      })
      .innerJoin('votos', 'v', 'pV.idVotacao = v.idVotacao')
      .where(`t.nome IN (:...topics)`, {
        'topics': subjects,
      })
      .groupBy('t.nome');
      
    const data = await query.getRawMany();
    
    console.log(query.getSql() + '\n');
    
    return data;
  }
}
