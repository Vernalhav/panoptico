# Monitor Político: Front-End

## Estrutura do projeto
```bash
monitor-politico-frontend
└── src
    ├── app
    │   ├── app-component       # Contém o componente raíz da aplicação Angular
    │   ├── components          # Define os componentes Angular da aplicação
    │   ├── core                # Contém a estrutura Model/Controller da aplicação (view está nos componentes Angular)
    │   │   ├── controllers   
    │   │   ├── entities        # Contém os tipos e classes compartilhados entre os módulos
    │   │   ├── models
    │   │   ├── services
    |   │   |    ├── backend    # Contém o código relativo à comunicação com o backend
    │   |   |    └── camara     # Contém o código relativo à comunicação com a API da câmara
    │   │   └── views           # Contém a lógica dos componentes visuais
    │   ├── external            # Contém código de fontes externas 
    │   ├── pages               # Contém os componentes Angular das páginas da aplicação
    │   └── shared              # Contém componentes que serão compartilhados (footer, header, etc.)
    └── assets                  # Contém imagens e ícones
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
para executar a aplucação. O site pode ser acessado pelo link http://localhost:4200.

Para o funcionamento correto da página, [o backend](../backend) também deve estar rodando.
