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
    
    const targetSubjects = await this.topicService.getByRegexList(regexSubjects);
    subjects = subjects.concat(targetSubjects);

    const subquery = getConnection().manager.createQueryBuilder().subQuery()
      .select(['pV.idVotacao'])
      .distinct(true)
      .from('topicos', 't')
      .innerJoin('proposicoesTemas', 'pT', `t.id = pT.idTopico`)
      .innerJoin('proposicoesVotacoes', 'pV', 'pT.idProposicao = pV.idProposicao AND pV.dataVotacao BETWEEN :start AND :end')
      .where(`t.nome IN (:...topics)`)
      .getQuery()

    const maxItems = 20;
    const query = getConnection().manager.createQueryBuilder()
      .select(['v.idVotacao', 'vtc.dataVotacao', 'COUNT(*) as total'])
      .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
      .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
      .from('votacoes', 'vtc')
      .innerJoin('votos', 'v', 'v.idVotacao = vtc.idVotacao')
      .where('vtc.idVotacao IN ' + subquery, { 
        'start': startDate,
        'end': endDate,
        'topics': subjects,
      })
      .groupBy('vtc.idVotacao')
      .limit(maxItems);
    
    console.log(query.getSql() + '\n');
    
    const data = await query.getRawMany();
    
    return data;
  }

  async getGroupedBySubjects(subjects: string[], regexSubjects: string[], startDate: string, endDate: string){
    const targetSubjects = await this.topicService.getByRegexList(regexSubjects);
    subjects = subjects.concat(targetSubjects);

    const subquery = getConnection().manager.createQueryBuilder().subQuery()
      .select(['pV.idVotacao', 't.nome as topico'])
      .distinct(true)
      .from('topicos', 't')
      .innerJoin('proposicoesTemas', 'pT', `t.id = pT.idTopico`)
      .innerJoin('proposicoesVotacoes', 'pV', 'pT.idProposicao = pV.idProposicao AND pV.dataVotacao BETWEEN :start AND :end', { 
        'start': startDate,
        'end': endDate
      })
      .where(`t.nome IN (:...topics)`, { 
        'topics': subjects,
      })
    
    const maxItems = 20;
    const query = getConnection().manager.createQueryBuilder()
      .select(['vtc.topico', 'COUNT(*) as total'])
      .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
      .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
      .from( '(' + subquery.getQuery() + ')', 'vtc').setParameters(subquery.getParameters())
      .innerJoin('votos', 'v', 'v.idVotacao = vtc.idVotacao')
      .groupBy('vtc.topico')
      .limit(maxItems);
    
    console.log(query.getSql() + '\n');
    
    const data = await query.getRawMany();
    
    return data;
  }

  async getGroupedBySubjectsAndEntities(
    subjects: string[], 
    regexSubjects: string[], 
    partiesIds: number[], 
    congresspersonIds: number[],
    startDate: string, 
    endDate: string
  ){
    const maxItems = 20;
    const targetSubjects = await this.topicService.getByRegexList(regexSubjects);
    subjects = subjects.concat(targetSubjects);

    const subquerySubjects = getConnection().manager.createQueryBuilder().subQuery()
      .select(['pV.idVotacao', 't.nome as topico'])
      .distinct(true)
      .from('topicos', 't')
      .innerJoin('proposicoesTemas', 'pT', `t.id = pT.idTopico`)
      .innerJoin('proposicoesVotacoes', 'pV', 'pT.idProposicao = pV.idProposicao AND pV.dataVotacao BETWEEN :start AND :end', { 
        'start': startDate,
        'end': endDate
      })
      .where(`t.nome IN (:...topics)`, { 
        'topics': subjects,
      })

    const subqueryParties = getConnection().manager.createQueryBuilder()
      .select(['vtc.topico subject', 'p.sigla as name', 'd.idPartido as id', '"partido" as type' ,'COUNT(*) as total'])
      .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
      .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
      .from('deputados', 'd')
      .innerJoin('votos', 'v', 'd.id = v.idDeputado')
      .innerJoin('partidos', 'p', 'p.id = d.idPartido')
      .innerJoin(subquerySubjects.getQuery(), 'vtc', 'v.idVotacao = vtc.idVotacao')
      .setParameters(subquerySubjects.getParameters())
      .where('d.idPartido IN (:...parties)', {
        'parties': partiesIds
      })
      .groupBy('vtc.topico')
      .addGroupBy('d.idPartido')
      .limit(maxItems);

    console.log(subqueryParties.getSql() + '\n');
    const partiesData = await subqueryParties.getRawMany()

    const subqueryCongresspersons = getConnection().manager.createQueryBuilder()
      .select(['vtc.topico subject', 'd.nomeEleitoral as name', 'd.id as id', '"deputado" as type' ,'COUNT(*) as total'])
      .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
      .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
      .from('deputados', 'd')
      .innerJoin('votos', 'v', 'd.id = v.idDeputado')
      .innerJoin( subquerySubjects.getQuery(), 'vtc', 'v.idVotacao = vtc.idVotacao')
      .setParameters(subquerySubjects.getParameters())
      .where('d.id IN (:...congresspeople)', {
        'congresspeople': congresspersonIds,
      })
      .groupBy('vtc.topico')
      .addGroupBy('d.id')
      .limit(maxItems);

    console.log(subqueryCongresspersons.getSql() + '\n');
    const congressData = await subqueryCongresspersons.getRawMany()
    
    return [].concat(partiesData).concat(congressData).reduce((results, p) => { 
      if(results[p.name] === undefined) { 
        results[p.name] = { id: p.id, type: p.type, subjects: [] }
      }
      
      results[p.name].subjects.push({ 
        subject: p.subject, total: p.total, sim: p.sim, nao: p.nao, outros: p.outros
      })

      return results
    }, {})
  }

  async getByEntitiesWithParcials(partiesIds: number[], congresspersonIds: number[], startDate: string, endDate: string) {
    const maxItems = 20;
    const baseQuery = (select) => getConnection().manager.createQueryBuilder()
      .select(select)
      .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
      .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
      .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
      .from('votos', 'v')
      .innerJoin('votacoes', 'pV', 'v.idVotacao = pV.idVotacao AND pV.dataVotacao BETWEEN :start AND :end', {
        'start': startDate,
        'end': endDate
      })
      .limit(maxItems);

    const getPartyVotes = baseQuery(['v.idVotacao', 'pV.dataVotacao', 'd.idPartido id', 'p.sigla as nome', '"partido" type', 'COUNT(*) as total'])
      .innerJoin('deputados', 'd', 'd.id = v.idDeputado AND (d.idPartido IN (:...parties))', {
          'parties': partiesIds
        })
      .innerJoin('partidos', 'p', 'p.id = d.idPartido')
      .groupBy('v.idVotacao, d.idPartido')

    const getCongressVotes = baseQuery(['v.idVotacao', 'pV.dataVotacao', 'v.idDeputado id', 'd.nomeEleitoral nome', '"deputado" type', 'COUNT(*) as total'])
      .innerJoin('deputados', 'd', 'd.id = v.idDeputado AND d.id IN (:...congresspeople)', {
          'congresspeople': congresspersonIds,
        })
      .groupBy('v.idVotacao, v.idDeputado')
    
    let data = [].concat(await getPartyVotes.getRawMany()).concat(await getCongressVotes.getRawMany())
    
    return Object.values(data.reduce((results, row) => { 
      if(results[row.idVotacao] === undefined) { 
        results[row.idVotacao] = { idVotacao: row.idVotacao, dataVotacao: row.dataVotacao, votes: [] }
      }

      results[row.idVotacao].votes.push({
        type: row.type, 
        id: row.id, 
        nome: row.nome,
        total: row.total, 
        sim: row.sim, 
        nao: row.nao, 
        outros: row.outros
      })

      return results;
    }, {}))
  }
}
