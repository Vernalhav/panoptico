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

export type ExpensesResponse = Expense[];

export interface Expense {
  ano: number,
  mes: number,
  tipoDespesa: string,
  codDocumento: number,
  tipoDocumento: string,
  codTipoDocumento: number,
  dataDocumento: string,
  numDocumento: number,
  valorDocumento: number,
  urlDocumento: string,
  nomeFornecedor: string,
  cnpjCpfFornecedor: string,
  valorLiquido: number,
  valorGlosa: number,
  numRessarcimento: string,
  codLote: number,
  parcela: number
}
