CREATE TABLE partidos(
	id INTEGER PRIMARY KEY,
	sigla VARCHAR(64),
	nome VARCHAR(128)
);

CREATE TABLE deputados(
	id INTEGER PRIMARY KEY,
	nomeEleitoral VARCHAR(128),
	UF VARCHAR(3),
	idPartido INTEGER,
	FOREIGN KEY(idPartido) REFERENCES partidos(id)
);

CREATE TABLE topicos(
	id INTEGER PRIMARY KEY,
	nome VARCHAR(64)
);

CREATE TABLE proposicoesAutores(
	idDeputado INTEGER,
	idProposicao INTEGER
);

CREATE TABLE proposicoesTemas(
	idProposicao KEY,
	ano INTEGER,
	idTopico INTEGER,
	siglaTipo varchar(12)
);

CREATE TABLE proposicoesVotacoes(
	dataVotacao VARCHAR(12),
	idVotacao INTEGER,
	idProposicao INTEGER
);

CREATE TABLE votos(
	idDeputado INTEGER,
	idVotacao INTEGER,
	voto VARCHAR(24)
);

CREATE TABLE votacoes(
    idVotacao INTEGER,
    dataVotacao VARCHAR(12)
);

-- SQLite3 populate tables
-- .mode csv partidos
-- .import partidos.csv partidos

-- .mode csv deputados
-- .import deputados.csv deputados

-- .mode csv topicos
-- .import topicos.csv topicos

-- .mode csv proposicoesAutores
-- .import proposicao-autores.csv proposicoesAutores

-- .mode csv proposicoesTemas
-- .import proposicao-temas.csv proposicoesTemas

-- .mode csv proposicoesVotacoes
-- .import proposicao-votacoes.csv proposicoesVotacoes

-- .mode csv votos
-- .import votacoes-votos.csv votos

INSERT INTO votacoes SELECT idVotacao, dataVotacao FROM proposicoesVotacoes GROUP BY idVotacao;

-- .output ./monitordb.sql
-- .dump
-- .exit