
# Store Manager

Esta foi uma API RESTful desenvolvida afim de consolidar os conhecimentos adquiridos
sobre o padrão de arquitetura de software MSC( Model-Service-Controller).

A API construída é de um sistema de gerenciamento de vendas no formato dropshipping 
que será possível criar, visualizar, deletar e atualizar produtos e vendas.

Foram desenvolvidos testes unitários para essa API utilizando Mocha, Chai e Sinon.

Para o gerenciamento dos dados foi utlizado o banco de dados relacional MYSQL.

## Autor

- [@saulomagalhaes](https://www.linkedin.com/in/sauloam/)

## Aprendizados

Construção de uma API RESTful aplicando o padrão de arquitetura de software MSC
( Model-Service-Controller), desenvolvimento de testes unitários.


## Rodando o servidor no Docker

Clone o projeto

```bash
  git clone git@github.com:saulomagalhaes/Store-Manager.git
```

Entre no diretório do projeto

```bash
  cd Store-Manager
```

Instale as dependências

```bash
  npm install
```

Suba o container Docker

```bash
  docker-compose up -d
```

Execute o container

```bash
   docker exec -it store_manager bash
```

Inicie o servidor dentro do container

```bash
   npm start
```
## Documentação da API

###  Products
#### Retorna todos os produtos

```http
  GET /products
```

#### Retorna um produto

```http
  GET /products/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer buscar |


#### Retorna um item

```http
  GET /products/search?q=NomeDoProduto
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `q`      | `string` | **Opcional**. O Nome do produto para a busca|
     Observação: Se não passar nenhum nome retorna todos os produtos.

#### Adiciona um produto

```http
  POST /products
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O Nome do produto a ser adicionado|


```javascript
Exemplo:
{
  "name": "Martelo de Thor"
}
```

#### Atualiza um produto

```http
  PUT /products/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer atualizar|

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O Nome do produto a ser atualizado|


```javascript
Exemplo:
{
  "name": "Luva de Pedreiro"
}
```
#### Deleta um produto

```http
  DELETE /products/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do produto que você quer deletar |



###  Sales
#### Retorna todas as vendas

```http
  GET /sales
```

#### Retorna uma venda

```http
  GET /sales/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer buscar |

#### Adiciona uma venda
```http
  POST /sales
```
| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `productId`      | `string` | **Obrigatório**. O id do produto|
| `quantity`      | `number` | **Obrigatório**. A quantidade|

#### Atualiza uma venda

```http
  PUT /sales/{id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer atualizar|

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `productId`      | `string` | **Obrigatório**. O id do produto|
| `quantity`      | `number` | **Obrigatório**. A quantidade|

#### Deleta uma venda

```http
  DELETE /sales/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da venda que você quer deletar |


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test:mocha
```

## Referências

 - [Swagger](https://swagger.io/)
 - [Node](https://nodejs.org/en/)
 - [Express](https://expressjs.com/)
 - [Mocha](https://mochajs.org/)
 - [Chai](https://www.chaijs.com/)
 - [Sinon](https://sinonjs.org/)




[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)


