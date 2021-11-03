import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { Subject } from './entities/subject.interface'

@Injectable()
export class VotingService {
  constructor() {}

  async getAll(partiesIds?: number[], congresspersonIds?: number[], subjects?: string[], regexSubjects?: string[], startDate?: string, endDate?: string){
    const data = await getConnection().manager.query("SELECT * FROM votos LIMIT 30;");

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
