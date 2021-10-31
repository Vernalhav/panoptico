-- Usefull Queries :)

-- Votos do deputado nos últimos meses
SELECT d.nomeEleitoral, v.voto, v.qtd 
	FROM deputados d, (SELECT idDeputado, voto, COUNT(*) qtd FROM votos GROUP BY idDeputado, voto) as v
	WHERE d.id == idDeputado
	ORDER BY d.nomeEleitoral, v.qtd ASC;

-- Votos dos deputados agrupados por tema
SELECT d.nomeEleitoral, t.nome, v.voto, v.qtd 
	FROM deputados d, topicos t,
	(SELECT v.idDeputado, pt.idTopico, v.voto, COUNT(*) qtd
	FROM votos v, proposicoesVotacoes pv, proposicoesTemas pt, topicos t
	WHERE v.idVotacao = pv.idVotacao AND pv.idProposicao = pt.idProposicao AND pt.idTopico = t.id
	GROUP BY idDeputado, pt.idTopico, voto) as v
	WHERE d.id == idDeputado AND v.idTopico = t.id
	ORDER BY d.nomeEleitoral, v.idTopico, v.qtd ASC;

-- votos dos partidos
SELECT sigla,
       SUM(CASE WHEN (voto = 'Sim') THEN 1 ELSE 0 END)       "sim",
       SUM(CASE WHEN (voto = 'Não') THEN 1 ELSE 0 END)       "não",
       SUM(CASE WHEN (voto = 'Obstrução') THEN 1 ELSE 0 END) "obstrução",
       pV.idVotacao
FROM votos
         JOIN proposicoesVotacoes pV on votos.idVotacao = pV.idVotacao
         JOIN deputados on votos.idDeputado = deputados.id
         JOIN partidos p on deputados.idPartido = p.id
WHERE sigla IN ('PATRIOTA', 'PSDB')
GROUP BY idPartido, pV.idVotacao;

-- votos dos deputados
SELECT idDeputado, nomeEleitoral, voto, votos.idVotacao
FROM votos
         JOIN deputados ON votos.idDeputado = deputados.id
         JOIN proposicoesVotacoes pV on votos.idVotacao = pV.idVotacao
         JOIN proposicoesTemas pT on pV.idProposicao = pT.idProposicao
WHERE idDeputado IN (73486);

-- votos por tema
SELECT GROUP_CONCAT(DISTINCT topicos.nome)                   "temas",
       SUM(CASE WHEN (voto = 'Sim') THEN 1 ELSE 0 END)       "sim",
       SUM(CASE WHEN (voto = 'Não') THEN 1 ELSE 0 END)       "não",
       SUM(CASE WHEN (voto = 'Obstrução') THEN 1 ELSE 0 END) "obstrução"
FROM topicos
         JOIN proposicoesTemas pT ON topicos.id = pT.idTopico
         JOIN proposicoesVotacoes pV on pT.idProposicao = pV.idProposicao
         JOIN votos v on pV.idVotacao = v.idVotacao
GROUP BY v.idVotacao
HAVING TRUE IN (
    temas REGEXP '.*Seg.*'
		temas = 'Administração Pública'
    );
