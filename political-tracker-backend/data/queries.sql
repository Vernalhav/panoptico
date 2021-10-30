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