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
	WHERE d.id = idDeputado AND v.idTopico = t.id
	ORDER BY d.nomeEleitoral, v.idTopico, v.qtd ASC;

-- Votos agrupados por partido e por tipo de voto em cada votacão
-- experimente mudar os valores de BETWEEN e as siglas dos partidos
SELECT t.nome AS topico, p.sigla, pV.dataVotacao, v.voto, COUNT(v.voto) AS contagem
FROM deputados d
INNER JOIN votos v ON d.id = v.idDeputado
INNER JOIN proposicoesVotacoes pV ON v.idVotacao = pV.idVotacao
INNER JOIN proposicoesTemas pT ON pV.idProposicao = pT.idProposicao
INNER JOIN topicos t ON pT.idTopico = t.id
INNER JOIN partidos p ON d.idPartido = p.id
WHERE pV.dataVotacao BETWEEN '2019-04-24' AND '2019-07-10'
AND p.sigla IN ('PT', 'PDT', 'AVANTE')
GROUP BY p.sigla, pV.dataVotacao, t.nome, v.voto
ORDER BY dataVotacao, t.nome

-- Votos agrupados por topico de interesse e por candidato, dado um range de tempo
SELECT t.nome as topico, d.nomeEleitoral, v.voto, count(v.voto) AS contagem
FROM deputados d
INNER JOIN votos v ON d.id = v.idDeputado
INNER JOIN proposicoesVotacoes pV ON v.idVotacao = pV.idVotacao
INNER JOIN proposicoesTemas pT ON pV.idProposicao = pT.idProposicao
INNER JOIN topicos t ON pT.idTopico = t.id
WHERE pV.dataVotacao BETWEEN '2019-04-24' AND '2019-07-10'
-- AND UPPER(t.nome) LIKE '%TU%'
-- AND d.nomeEleitoral IN ('Adolfo Viana')
-- AND t.nome IN ('Previdência e Assistência Social')
GROUP BY t.nome, d.nomeEleitoral, v.voto
ORDER BY d.nomeEleitoral;

-- mother of god
SELECT v.idVotacao,
       pV.dataVotacao,
       REPLACE(REPLACE(group_concat(DISTINCT replace(DISTINCT t.nome, ',', 'ᵔᴥᵔ')), ',', '; '), 'ᵔᴥᵔ', ',') AS temas,
       SUM(CASE WHEN (v.voto = 'Sim') THEN 1 ELSE 0 END)                        "sim",
       SUM(CASE WHEN (v.voto = 'Não') THEN 1 ELSE 0 END)                        "nao",
       SUM(CASE WHEN (v.voto = 'Abstenção') THEN 1 ELSE 0 END)                  "abstencoes",
       SUM(CASE WHEN (v.voto IN ('Sim', 'Não', 'Abstenção')) THEN 0 ELSE 1 END) "Outros"
FROM votos v
         INNER JOIN proposicoesVotacoes pV ON v.idVotacao = pV.idVotacao
         INNER JOIN proposicoesTemas pT on pV.idProposicao = pT.idProposicao
         INNER JOIN topicos t ON pT.idTopico = t.id
WHERE pV.dataVotacao BETWEEN '2019-04-24' AND '2019-07-10'
AND (t.nome IN ('Previdência e Assistência Social')
    OR t.nome REGEXP 'Fi.*')
GROUP BY v.idVotacao, pV.dataVotacao
