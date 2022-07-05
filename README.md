
# Store Manager

Esta foi uma API RESTful que desenvolvi afim de consolidar os conhecimentos adquiridos
sobre a arquitetura de software MSC( Model-Service-Controller).

A API construída é de um sistema de gerenciamento de vendas no formato dropshipping 
que será possível criar, visualizar, deletar e atualizar produtos e vendas.

Para o gerenciamento dos dados foi utlizado o banco de dados relacional MYSQL.




## Autor

- [@saulomagalhaes](https://www.linkedin.com/in/sauloam/)


## Stack utilizada

**Back-end:** Node, Express, Mocha, Chai, Sinon, Swagger


## Rodando localmente

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

Inicie o servidor

```bash
   npm start
```
## Documentação da API

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
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |


#### Retorna um item

```http
  GET /products/search?q=NomeDoProduto
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `q`      | `string` | **Opcional**. O Nome do produto para a busca|
     Observação: Se não passar nenhum nome volta todos os produtos.

#### Adiciona um produto

```http
  POST /products
```
#### (body) - **Obrigatório**
```javascript
Exemplo:
{
  "name": "Martelo de Thor"
}
```


## Referência

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Etiquetas
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Demonstração

Insira um gif ou um link de alguma demonstração


## Aprendizados

O que você aprendeu construindo esse projeto? Quais desafios você enfrentou e como você superou-os?

