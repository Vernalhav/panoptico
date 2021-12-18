-- CREATE DATABASE FILE
-- $ sqlite3 database.sqlite3 < schema.sql

-- CREATE CSV TABLES 
CREATE TABLE partidos(
	id INTEGER PRIMARY KEY,
	sigla VARCHAR(64),
	nome VARCHAR(128),
	atividade VARCHAR(32),
	totalMembros INTEGER,
	nomeLider VARCHAR(128)
);

CREATE TABLE deputados(
	id INTEGER,
	nome VARCHAR(128),
	idPartido INTEGER,
	siglaPartido VARCHAR(64),
	UF VARCHAR(3),
	urlFoto VARCHAR(256),
	email VARCHAR(128),
	nomeCivil VARCHAR(128),
	escolaridade VARCHAR(128),
	ufNascimento VARCHAR(3),
	municipioNascimento VARCHAR(128),
	sexo CHAR,
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

DELETE FROM partidos WHERE partidos.atividade <> 'Ativo' OR partidos.totalMembros = 0;

.mode csv deputados
.import ./csv/deputados.csv deputados

DELETE FROM deputados WHERE deputados.idPartido not in (SELECT id FROM partidos);

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

-- FILTER PROPOSITIONS BY TYPE (PL, PLP, PLV, PLS, PLC, PLN, PEC)
DELETE FROM proposicoesTemas WHERE siglaTipo not in ('PL', 'PLP', 'PLV', 'PLS', 'PLC', 'PLN', 'PEC');

DELETE FROM proposicoesAutores
	WHERE idProposicao NOT IN (SELECT idProposicao FROM proposicoesTemas);

DELETE FROM proposicoesVotacoes
	WHERE idProposicao NOT IN (SELECT idProposicao FROM proposicoesTemas);

-- CREATE ENTITY TABLES
CREATE TABLE Party (
	id INTEGER PRIMARY KEY,
	acronym VARCHAR(64),
	name VARCHAR(128),
	totalMembers INTEGER,
	liderName VARCHAR(128)
);

CREATE TABLE Congressperson(
	id INTEGER PRIMARY KEY,
	name VARCHAR(128),
	state VARCHAR(3),
	partyId INTEGER,
	photoUrl VARCHAR(256),
	email VARCHAR(128),
	civilName VARCHAR(128),
	scholarity VARCHAR(128),
	birthState VARCHAR(3),
	birthCity VARCHAR(128),
	sex CHAR
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

CREATE TABLE LawCountByAuthor(
  congresspersonId INTEGER,
  subjectId INTEGER,
  lawCount INTEGER,
	PRIMARY KEY (congresspersonId, subjectId),
	FOREIGN KEY(congresspersonId) REFERENCES congressperson(id),
	FOREIGN KEY(subjectId) REFERENCES subject(id)
);

CREATE TABLE LawCountByParty(
  partyId INTEGER,
  subjectId INTEGER,
  lawCount INTEGER,
	PRIMARY KEY (partyId, subjectId),
	FOREIGN KEY(partyId) REFERENCES party(id),
	FOREIGN KEY(subjectId) REFERENCES subject(id)
);

-- POPULATE ENTITIES TABLES
INSERT INTO Party SELECT id, sigla, nome, totalMembros, nomeLider FROM partidos;

INSERT INTO Congressperson 
	SELECT id, nome, UF, idPartido, urlFoto, email, nomeCivil, escolaridade, ufNascimento, municipioNascimento, sexo 
	FROM deputados;

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

INSERT INTO LawCountByAuthor SELECT pA.idDeputado, pT.idTopico, COUNT(pA.idProposicao) FROM proposicoesAutores AS pA 
	INNER JOIN proposicoesTemas AS pT ON pA.idProposicao = pT.idProposicao 
	WHERE pT.siglaTipo <> 'PEC' 
	GROUP BY pA.idDeputado, pT.idTopico;

INSERT INTO LawCountByParty
	SELECT d.idPartido, pT.idTopico, COUNT(pA.idProposicao)
	FROM proposicoesAutores as pA
	INNER JOIN deputados as d ON d.id = pA.idDeputado
	INNER JOIN proposicoesTemas as pT ON pT.idProposicao = pA.idProposicao
	WHERE pT.siglaTipo <> 'PEC'
	GROUP BY d.idPartido, pT.idTopico;  

-- REMOVE CSV TEMP TABLES
DROP TABLE partidos;
DROP TABLE deputados;
DROP TABLE topicos;
DROP TABLE proposicoesAutores;
DROP TABLE proposicoesTemas;
DROP TABLE proposicoesVotacoes;
DROP TABLE votos;

-- SELECT c.name, s.name, LCA.lawCount
-- 	FROM LawCountByAuthor as LCA
-- 	INNER JOIN Congressperson as c on c.id = LCA.congresspersonId
-- 	INNER JOIN Subject as s on s.id = LCA.subjectId;

-- SELECT p.acronym, s.name, LCP.lawCount
-- 	FROM LawCountByParty as LCP
-- 	INNER JOIN Party as p on p.id = LCP.partyId
-- 	INNER JOIN Subject as s on s.id = LCP.subjectId;

-- .output ./monitordb.sql
-- .dump
-- .exit