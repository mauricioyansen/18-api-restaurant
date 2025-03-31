# Restaurant Management API

Restaurant Management API é uma API desenvolvida com TypeScript, Express.js e Knex.js para gerenciar produtos, mesas, sessões de mesas e pedidos em um restaurante.

## Tecnologias Utilizadas
- Node.js
- TypeScript
- Express.js
- Knex.js
- SQLite (para ambiente de desenvolvimento)
- PostgreSQL (para produção)

## Como Executar o Projeto Localmente
Siga os passos abaixo para rodar a API localmente:

### 1. Clonar o Repositório
```sh
git clone https://github.com/seu-usuario/restaurant-api.git
cd restaurant-api
```

### 2. Instalar as Dependências
```sh
npm install
```

### 3. Configurar o Banco de Dados
A API usa SQLite para desenvolvimento. Para configurar, execute:
```sh
npx knex migrate:latest
```
Isso criará as tabelas necessárias no banco de dados.

### 4. Rodar a API
```sh
npm run dev
```
A API será executada em `http://localhost:3000` por padrão.

## Endpoints Principais

### Produtos (`/products`)
- `GET /products` - Lista todos os produtos.
- `POST /products` - Cria um novo produto.
  - Exemplo de requisição:
    ```json
    {
      "name": "Frango",
      "price": 15
    }
    ```
- `PUT /products/:id` - Atualiza um produto existente.
- `DELETE /products/:id` - Remove um produto.

### Mesas (`/tables`)
- `GET /tables` - Lista todas as mesas cadastradas.

### Sessões de Mesas (`/table-sessions`)
- `POST /table-sessions` - Inicia uma sessão para uma mesa.
  - Exemplo de requisição:
    ```json
    {
      "table_id": 26
    }
    ```
- `GET /table-sessions` - Lista todas as sessões ativas.
- `PATCH /table-sessions/:id` - Finaliza uma sessão de mesa.

### Pedidos (`/orders`)
- `POST /orders` - Cria um novo pedido para uma mesa ativa.
  - Exemplo de requisição:
    ```json
    {
      "table_session_id": 5,
      "product_id": 1,
      "quantity": 1
    }
    ```
- `GET /orders/table-session/:table_session_id` - Lista todos os pedidos de uma sessão de mesa.
- `GET /orders/table-session/:table_session_id/total` - Retorna o total da conta da mesa.

---
Agora você pode testar a API localmente! 🚀

