# teste-nemu

Repositório utilizado para teste técnico da [Nemu](usenemu.com)

## Objetivo

O teste consiste em processar uma planilha contendo dados brutos de jornadas de usuários.
A aplicação agrupa cada jornada com base no sessionId, ordena os eventos por data de criação e remove canais duplicados no meio do percurso de cada jornada.

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/igorfrag/teste-nemu.git
    ```
2. Navege até o diretório:
    ```bash
    cd teste-nemu
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Execute a aplicação em modo de desenvolvimento ou produção:
    ```bash
    npm run dev
    # ou
    npm run build && npm run start
    ```
5. Instale as dependências do cliente:
    ```bash
    cd client && npm install
    ```
6. Execute o cliente React

    ```bash
    npm run dev
    # ou
    npm run build && npm run start
    ```

## Dependências

    - Express
    - ExcelJS
    - Cors
