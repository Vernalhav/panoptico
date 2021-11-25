type VotesBySubject = {
  subject: string;
  total: number;
  sim: number;
  nao: number;
  outros: number;
};

export interface IAPIVotingBySubject {
  id: number;
  entityName: string;
  type: 'deputado' | 'partido';
  subjects: VotesBySubject[];
}
