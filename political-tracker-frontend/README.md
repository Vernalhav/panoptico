# Monitor Político: Front-End

## Estrutura do projeto
```bash
monitor-politico-frontend
└── src
    ├── app                     # Módulo raíz da aplicação
    │   └── core
    │       ├── interfaces      # Define as interfaces de objetos que serão transmitidos entre cliente e servidor
    │       └── services        # Define os modelos do sistema
    ├── assets
    ├── components              # Define os componentes Angular da aplicação
    ├── environments
    └── pages                   # Define os componentes Angular das páginas da aplicação
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

Para o funcionamento correto da página, [o backend](../political-tracker-backend) também deve estar rodando.
