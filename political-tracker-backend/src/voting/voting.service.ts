import { Injectable } from '@nestjs/common';
import { getConnection, Between } from 'typeorm';
import { Subject } from './entities/subject.interface'

@Injectable()
export class VotingService {
  constructor() {}

  async getAll(partiesIds?: number[],
                congresspersonIds?: number[], 
                subjects = ['Previdência e Assistência Social'],
                regexSubjects = ['Fi.*', 'aaaaaa', 'P+'],
                startDate = '2019-04-24',
                endDate = '2019-07-10'){
    
    const query = await getConnection().manager.createQueryBuilder()
                  .select(['v.idVotacao', 'pV.dataVotacao', 'COUNT(*) as total'])
                  .addSelect(`'[' || group_concat(DISTINCT '"' || REPLACE(t.nome, '"', '') || '"') || ']'`, 'temas')
                  .addSelect(`SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)`, 'sim')
                  .addSelect(`SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)`, 'nao')
                  .addSelect(`SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)`, 'abstencao')
                  .addSelect(`SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END)`, 'outros')
                  .from('votos', 'v')
                  .innerJoin('proposicoesVotacoes', 'pV', 'v.idVotacao = pV.idVotacao AND pV.dataVotacao BETWEEN :start AND :end',
                    {
                      'start': startDate,
                      'end': endDate
                    })
                  .innerJoin('proposicoesTemas', 'pT', 'pV.idProposicao = pT.idProposicao')
                  .innerJoin('topicos', 't', `pT.idTopico = t.id AND (t.nome IN (:...topics))`,
                    {
                      'topics': subjects,
                    })
                  .groupBy('v.idVotacao')
                  .addGroupBy('pv.dataVotacao')
                  .limit(5);
    
    console.log(query.getSql());
    const data = await query.getRawMany();
    data.forEach(element => {
      element.temas = JSON.parse(element.temas)
    });;

    // SELECT v.idVotacao,
    //    pV.dataVotacao,
    //    REPLACE(REPLACE(group_concat(DISTINCT replace(DISTINCT t.nome, ',', 'ᵔᴥᵔ')), ',', '; '), 'ᵔᴥᵔ', ',') AS temas,
    //    SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)                        "sim",
    //    SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)                        "nao",
    //    SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)                  "abstencoes",
    //    SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END) "Outros"
    // FROM votos v
    //         INNER JOIN proposicoesVotacoes pV ON v.idVotacao = pV.idVotacao
    //         INNER JOIN proposicoesTemas pT on pV.idProposicao = pT.idProposicao
    //         INNER JOIN topicos t ON pT.idTopico = t.id
    // WHERE pV.dataVotacao BETWEEN '2019-04-24' AND '2019-07-10'
    // AND (t.nome IN ('Previdência e Assistência Social')
    //     OR t.nome REGEXP 'Fi.*')
    // GROUP BY v.idVotacao, pV.dataVotacao
    return data;
  }
}
