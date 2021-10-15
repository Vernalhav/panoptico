# Monitor Político: Backend

## Objetos
As rotas da API retornam vetores de Deputados e Partidos. As interfaces desses objetos são:
```ts
// Deputado
{
  id: number;
  name: string;
  state: string;
  partyId: number;
}
```
```ts
// Partido
{
  id: number;
  name: string;
  acronym: string;
  members?: Deputado[];
}
```


## Rotas
`/deputados`: Retorna um vetor de objetos Deputado contendo todos os Deputados ativos registrados na API de Dados Abertos.

`/partidos`: Retorna um vetor de objetos Partido contendo todos os Partidos que contém membros ativos, sem preencher o vetor de membros.  

 `/partidos/membros`: Retorna um vetor de objetos Partido contendo todos os Partidos que contém membros ativos, com seus respectivos Deputados;


## Estrutura do projeto
```bash
political-tracker-backend
├── data                    # Contém os dados coletados da API de Dados Abertos da Câmara dos Deputados
├── src
│   ├── congressperson      # Contém as classes relativas aos deputados
│   │   └── entities
│   └── party               # Contém as classes relativas aos partidos
│       └── entities
└── test                    # Contém os testes automatizados
```
