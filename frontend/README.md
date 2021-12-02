# Monitor Político: Front-End

## Estrutura do projeto
```bash
monitor-politico-frontend
└── src
    ├── app
    │   └── core                # Contém os módulos essenciais dos serviços externos
    │       ├── interfaces      # Contém as interfaces de tipos de dados dos serviços
    │       └── services
    │           ├── backend     # Contém o código relativo à comunicação com o backend
    │           └── camara      # Contém o código relativo à comunicação com a API da câmara
    ├── assets
    ├── components              # Define os componentes Angular da aplicação
    ├── core                    # Contém a estrutura Model/Controller da aplicação (view está nos componentes Angular)
    │   ├── controller
    │   ├── model
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
