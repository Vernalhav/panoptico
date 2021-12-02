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

 `/partidos/membros`: Retorna um vetor de objetos Partido contendo todos os Partidos que contém membros ativos, com seus respectivos Deputados.

`/votacoes/entidades`: Retorna um vetor de objetos VotacoesEntidades contendo, para cada votação, as entidades selecionadas e seus votos.

`/votacoes/topicos`: Retorna um vetor de objetos VotacoesTopicos contendo, para cada tópico (ou tema), as entidades selecionadas e seus votos.

## Estrutura do projeto
```bash
political-tracker-backend
├── data                    # Contém o banco de dados e os arquivos de esquema, consultas e dados
│   └── csv                 # Contém os dados coletados da API de Dados Abertos da Câmara dos Deputados
├── src
│   ├── congressperson      # Contém as classes relativas aos deputados
│   │   └── entities
│   ├── party               # Contém as classes relativas aos partidos
│   │   └── entities
│   ├── topics              # Contém as classes relativas aos temas das proposições
│   ├── utils               # Contém funções utilitárias
│   └── voting              # Contém as classes relativas às votações e votos
│       └── entities
└── test                   # Contém os testes automatizados

```

## MVC
A arquitetura recomendada pelo framework Nest.JS dá nomes diferentes aos componentes comummente associados ao MVC. Para esse projeto, os arquivos com extensão `.controller.ts`correspondem aos Controllers e os arquivos `.service.ts` correspondem aos Models. 

## Instalação e execução
Após clonar o projeto, execute
```
npm install
```
para instalar as dependências, e depois
```
npm start
```
para executar a aplucação. O servidor escutará a porta 3000.
