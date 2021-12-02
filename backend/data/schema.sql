-- CREATE DATABASE FILE
-- $ sqlite3 database.sqlite3 < schema.sql

-- CREATE CSV TABLES 
CREATE TABLE partidos(
	id INTEGER PRIMARY KEY,
	sigla VARCHAR(64),
	nome VARCHAR(128)
);

CREATE TABLE deputados(
	id INTEGER PRIMARY KEY,
	nome VARCHAR(128),
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

-- POPULATE DATABASES WITH CSVS
.mode csv partidos
.import ./csv/partidos.csv partidos

.mode csv deputados
.import ./csv/deputados.csv deputados

.mode csv topicos
.import ./csv/topicos.csv topicos

.mode csv proposicoesAutores
.import ./csv/proposicao-autores.csv proposicoesAutores

.mode csv proposicoesTemas
.import ./csv/proposicao-temas.csv proposicoesTemas

.mode csv proposicoesVotacoes
.import ./csv/proposicao-votacoes.csv proposicoesVotacoes

.mode csv votos
.import ./csv/votacoes-votos.csv votos

-- CREATE ENTITY TABLES
CREATE TABLE Party (
	id INTEGER PRIMARY KEY,
	acronym VARCHAR(64),
	name VARCHAR(128)
);

CREATE TABLE Congressperson(
	id INTEGER PRIMARY KEY,
	name VARCHAR(128),
	state VARCHAR(3),
	partyId INTEGER
);

CREATE TABLE Voting(
  id PRIMARY KEY,
  date VARCHAR(12)
);

CREATE TABLE Subject(
	id INTEGER PRIMARY KEY,
	name VARCHAR(64)
);

CREATE TABLE Vote(
	id INTEGER PRIMARY KEY,
  partyId INTEGER,
	congresspersonId INTEGER,
	votingId INTEGER,
  text VARCHAR(24),
	yes BOOLEAN,
  no BOOLEAN,
  other BOOLEAN,
  FOREIGN KEY(partyId) REFERENCES party(id),
  FOREIGN KEY(congresspersonId) REFERENCES congressperson(id),
  FOREIGN KEY(votingId) REFERENCES voting(id)
);

CREATE TABLE VoteByParty(
	id INTEGER PRIMARY KEY,
  partyId INTEGER,
	votingId INTEGER,
	yes INTEGER,
  no INTEGER,
  other INTEGER,
  FOREIGN KEY(partyId) REFERENCES party(id),
  FOREIGN KEY(votingId) REFERENCES voting(id)
);

CREATE TABLE VotingSubject(
  votingId INTEGER,
  subjectId INTEGER,
  FOREIGN KEY(votingId) REFERENCES voting(id),
  FOREIGN KEY(subjectId) REFERENCES subject(id)
);

-- POPULATE ENTITIES TABLES
INSERT INTO Party SELECT id, sigla, nome FROM partidos;

INSERT INTO Congressperson SELECT id, nome, UF, idPartido FROM deputados;

INSERT INTO Voting SELECT idVotacao, dataVotacao FROM proposicoesVotacoes GROUP BY idVotacao;

INSERT INTO Subject SELECT id, nome FROM topicos;

INSERT INTO Vote 
  SELECT NULL, d.idPartido, d.id, v.idVotacao, v.voto, v.voto = 'Sim', v.voto = 'Não', v.voto != 'Sim' AND v.voto != 'Não'
  FROM votos v 
  INNER JOIN deputados d ON d.id = v.idDeputado;

INSERT INTO VoteByParty 
  SELECT NULL, v.partyId, v.votingId, SUM(v.yes = 1), SUM(v.no = 1), SUM(v.other = 1)
  FROM Vote v 
  GROUP BY v.partyId, v.votingId;

INSERT INTO VotingSubject
  SELECT DISTINCT pV.idVotacao, pT.idTopico
  FROM proposicoesVotacoes pV
  INNER JOIN proposicoesTemas pT ON pV.idProposicao = pT.idProposicao;

-- REMOVE CSV TEMP TABLES
DROP TABLE partidos;
DROP TABLE deputados;
DROP TABLE topicos;
DROP TABLE proposicoesAutores;
DROP TABLE proposicoesTemas;
DROP TABLE proposicoesVotacoes;
DROP TABLE votos;

-- .output ./monitordb.sql
-- .dump
-- .exit