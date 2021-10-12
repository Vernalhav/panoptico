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
