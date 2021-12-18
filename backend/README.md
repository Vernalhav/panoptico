# Monitor Político: Backend

## Estrutura do projeto
```bash
backend
├── data                    # Contém o banco de dados e os arquivos de esquema, consultas e dados
│   └── csv                 # Contém os dados coletados da API de Dados Abertos da Câmara dos Deputados
└── src
    ├── controllers         # Contém as classes responsáveis por lidar com as requisições
    ├── entities            # Contém as entidades que são mapeadas para o banco de dados
    ├── services            # Contém as classes responsáveis por consultar dados no BD
    ├── shared
    │   ├── dto             # Contém as interfaces dos dados recebidos e enviados para o backend
    │   ├── mappers         # Contém as classes responsáveis por mapear dados entre DTOs e classes do domínio
    │   └── utils
    └── tests               # Contém os testes automatizados
```

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

## MVC
A arquitetura recomendada pelo framework Nest.JS dá nomes diferentes aos componentes comummente associados ao MVC. Para esse projeto, os arquivos com extensão `.controller.ts`correspondem aos Controllers e os arquivos `.service.ts` correspondem aos Models. 


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
