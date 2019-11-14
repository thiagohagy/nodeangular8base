#Teste de tecnologias frotend e backend

* Para facilitar os testes das rotas, basta instalar a extensão REST Client para o visual studio e usar o arquivo /backend/http.rest.
* Ao clicar em SendRequest a IDE vai fazer uma requisição conforme os parâmetros de cada request   
* Todos as rotas exceto /me e /login são autenticadas e devem conter o campo 'token'(via query param), ou então você deve enviar o token no header 'authorization'
* Todos os requests devem conter o Content-Type: application/json
* Em todas as rotas autenticadas documentadas subentende-se que o token esta no header para facilitar a visualização dos exemplos
------------------------------

* Para fazer o login no sistema após fazer o restore do banco de dados, voce pode usar as credenciais do exemplo de login a seguir

------------------------------

Rotas não autenticadas

Fazer login

```
POST http://localhost:8357/api/login
```

Dados do post 

```
// Dados do token
{
  "email": "root@sistema.com",
  "password": "123"
}

// Resposta de sucesso
{
  "success": true,
  "message": "Logged-in!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvb3RAc2lzdGVtYS5jb20iLCJfaWQiOiI1ZGNkYWNhY2QyMzJjZjBhZGNiMGUxYzQiLCJuYW1lIjoicm9vdCIsImlhdCI6MTU3Mzc2MTk3NiwiZXhwIjoxNTczODQ4Mzc2fQ.Q3Sgbq40YR4sKbYyGno4vNtCqFxeyTJ7oWcoTx4HT9Y"
}
```


Validar token e retornar dados do token informado se o token for válido

GET http://localhost:8357/api/me?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvb3RAc2lzdGVtYS5jb20iLCJfaWQiOiI1ZGNkYWNhY2QyMzJjZjBhZGNiMGUxYzQiLCJuYW1lIjoicm9vdCIsImlhdCI6MTU3Mzc2MTk3NiwiZXhwIjoxNTczODQ4Mzc2fQ.Q3Sgbq40YR4sKbYyGno4vNtCqFxeyTJ7oWcoTx4HT9Y


```
// Resposta de sucesso
{
  "success": true,
  "data": {
    "email": "root@sistema.com",
    "_id": "5dcdacacd232cf0adcb0e1c4",
    "name": "root",
    "iat": 1573481459,
    "exp": 1573567859
  }
}
```
------------------------------


Rotas autenticadas

Buscar detalhes de um usuario
```
// url com id do user
GET http://localhost:8357/api//v1/users/5dcdacacd232cf0adcb0e1c4

// resposta do metodo
{
   "success": true,
  "data": {
    "_id": "5dcdacacd232cf0adcb0e1c4",
    "email": "root@sistema.com",
    "name": "root",
    "creationDate": "2019-11-14T19:36:12.625Z",
    "contatos": [{
      "_id": "5dcdacacd232cf0adcb0e1c5",
      "type": "telefone",
      "value": "42 99999 9999",
      "user": "5dcdacacd232cf0adcb0e1c4",
      "__v": 0
    }]
  }
}

```

Listar todos os usuarios com paginação via query param
```
GET http://localhost:8357/api/v1/users/list?skip=0&limit=5

//resposta do request
{
  "total": 7,
  "data": [
    {
      "_id": "5dcdac74d232cf0adcb0e1c1",
      "email": "user1@sistema.com",
      "name": "User1",
      "creationDate": "2019-11-14T19:35:16.480Z",
      "contatos": [{
        "_id": "5dcdac74d232cf0adcb0e1c2",
        "type": "telefone",
        "value": "42 9 9998 1464",
        "user": "5dcdac74d232cf0adcb0e1c1",
        "__v": 0
      }, {
        "_id": "5dcdac74d232cf0adcb0e1c3",
        "type": "email 2",
        "value": "user1_2@sistema.com",
        "user": "5dcdac74d232cf0adcb0e1c1",
        "__v": 0
      }]
    },
  ...
  ]
}
```


Listar todos os usuarios usando agregate para filtragem e acesso a dados de outra collection
```
GET http://localhost:8357/api/v1/users/filter?name=user1&date=2019-11-14

// resposta do post
{
  "total": 1,
  "data": [
    {
      "_id": "5dc86cf6b5798135d1dc429d",
      "login_email": "thiago@gmasdil.com",
      "nome": "thiago",
      "data_criacao": "2019-11-11T20:03:02.561Z",
      "contatos": [
        //contatos aqui
      ]
    }
  ]
}
  
```


Cadastrar novo usuário
```
POST http://localhost:8357/api/v1/users
```
```
//Dados do post
{
  "email": "teste@gmail.com",
  "password": "123",
  "name": "Teste user 2",
  "contatos": [
    {
      "type": "telefone",
      "value": "42999981464"
    },
    {
      "type": "celular",
      "value": "42999981464"
    },
    {
      "type": "email",
      "value": "thiago testes"
    },{
      "type": "linkedin",
      "value": "thiagohagy"
    }
  ]
}

// dados de resposta
{
  "success": true,
  "data": {
    "active": true,
    "_id": "5dc96e3d6a283c22b3d9fb2b",
    "email": "teste@gmail.com",
    "password": "$2a$10$qnR1vndiSyari36qKYLCZ.l77130HNW5VAx3/BR6dv3pbHA1EbhO2",
    "name": "hagy",
    "creationDate": "2019-11-14T14:20:45.613Z",
    "__v": 0
  },
  "err": null,
  "form": {
    "email": "hagy@gmail.com",
    "password": "123",
    "name": "hagy",
    "contatos": [
      {
        "type": "telefone",
        "value": "42999981464"
      },
      {
        "type": "celular",
        "value": "42999981464"
      },
      {
        "type": "email",
        "value": "thiago testes"
      },
      {
        "type": "linkedin",
        "value": "thiagohagy"
      }
    ],
    "createdBy": "5dc86cf6b5798135d1dc429d"
  }
}
```


Editar usuário, o id deve ir no params e os dados de edição no corpo do post
```
PUT http://localhost:8357/api/v1/users/5dc86cf6b5798135d1dc429d
```
```
//Dados do post
{
  "email": "teste@gmail1.com",
  "name": "thiago",
  "contatos": [{
      "type": "email0",
      "value": "thiagotestes.combr"
    }, {
      "type": "celular",
      "value": "42999981464"
    }, {
      "type": "email",
      "value": "thiago testes"
    }, {
      "type": "linkedin",
      "value": "thiagohagy"
    }
  ]
}
```


Soft delete de um usuário
```
DELETE http://localhost:8357/api/v1/users/5dc868c1f408113127aa0e28

// resposta do método
{
  success: true
}

```
