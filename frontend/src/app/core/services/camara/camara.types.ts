export interface UltimaApresentacaoProposicao {
  dataHoraRegistro: Date;
  descricao: string;
  uriProposicaoCitada: string;
}

export interface ObjetoPossivel {
  id: number;
  uri: string;
  siglaTipo: string;
  codTipo: number;
  numero: number;
  ano: number;
  ementa: string;
}

export interface ProposicaoAfetada {
  id: number;
  uri: string;
  siglaTipo: string;
  codTipo: number;
  numero: number;
  ano: number;
  ementa: string;
}

export interface VotingDetailsResponse {
  id: string;
  uri: string;
  data: string;
  dataHoraRegistro: Date;
  siglaOrgao: string;
  uriOrgao: string;
  idOrgao: number;
  uriEvento: string;
  idEvento: number;
  descricao: string;
  aprovacao: number;
  descUltimaAberturaVotacao?: any;
  dataHoraUltimaAberturaVotacao?: any;
  ultimaApresentacaoProposicao: UltimaApresentacaoProposicao;
  efeitosRegistrados: any[];
  objetosPossiveis: ObjetoPossivel[];
  proposicoesAfetadas: ProposicaoAfetada[];
}
