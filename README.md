# Daily News

Daily News é uma aplicação web que fornece as últimas notícias em várias categorias, incluindo tecnologia, política, esportes e ciência. A aplicação é construída usando Angular e inclui testes unitários com Jest e testes end-to-end com Playwright.

## Stack Utilizada no Projeto

- Angular
- TypeScript
- Jest
- Playwright
- Bootstrap
- Bootstrap Icons
- PNPM
- Ngx Carousel Ease

## Funcionalidades

- Carrossel de notícias principais
- Visualização de notícias recentes
- Visualização de notícias por categoria
- Alternância de tema (claro/escuro)
- Pesquisa de previsão do tempo

## Convencional Commits

Este projeto segue a especificação de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Aqui estão alguns exemplos de mensagens de commit:

- `feat: adiciona nova funcionalidade`
- `fix: corrige um bug`
- `refactor: refatoração de código`
- `test: adiciona ou corrige testes`
- `chore: atualiza tarefas de build, configurações de CI, etc`

## CI/CD

Este projeto utiliza GitHub Actions para CI/CD. O pipeline está configurado para executar os testes unitários com Jest e os testes end-to-end com Playwright. Após a execução dos testes, o projeto é implantado automaticamente no Vercel.

O arquivo de configuração do GitHub Actions pode ser encontrado em `.github/workflows/ci.yml`.

## Instalação

Para instalar e executar o projeto localmente, siga estas etapas:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/daily-news.git
   cd daily-news

2. Instale as dependências:

   ```bash
   npm install -g pnpm
   pnpm install

3. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm start

4. Abra o navegador e navegue para ``http://localhost:4200/``.


## Testes

### Testes Unitários
Para executar testes unitários com o Jest, use o seguinte comando:

   ```bash
   pnpm test
  ```
![Captura de tela de 2024-12-23 17-15-27](https://github.com/user-attachments/assets/898f0456-93ad-412c-970b-cd56b93af305)

### Testes End-to-End
Para testes end-to-end (E2E) com Playwright, use:

   ```bash
   npx playwright test --ui 
  ```
![Captura de tela de 2024-12-24 10-50-45](https://github.com/user-attachments/assets/813bce05-e822-4a3f-94d9-443c7a100b75)
