export interface IAPIVotingsRequest {
  partiesIds?: number[];
  congresspersonIds?: number[];
  subjects?: string[];
  regexSubjects?: string[];
  startDate?: string;
  endDate?: string;
}

export interface IAPIVoting {
  idVotacao: string;
  dataVotacao: string;
  temas: string[] | null;
  sim: number;
  nao: number;
  abstencao: number;
  outros: number;
  total: number;
}
