export interface IAPIVotingsRequest {
  partiesIds?: number[];
  congresspersonIds?: number[];
  subjects?: string[];
  regexSubjects?: string[];
  startDate?: string;
  endDate?: string;
}

type VotesByVoting = {
  type: 'deputado' | 'partido';
  id: number;
  nome: string;
  total: number;
  sim: number;
  nao: number;
  outros: number;
};

export interface IAPIVoting {
  idVotacao: string;
  dataVotacao: string;
  votes: VotesByVoting[];
}
