# MinhasAudiencias

Teste de vaga Desenvolvedor Backend


* Para facilitar os testes das rotas, basta instalar a extensão REST Client para o visual studio e usar o arquivo /backend/http.rest.
* Ao clicar em SendRequest a IDE vai fazer uma requisição conforme os parâmetros de cada request   
* Todos as rotas exceto /me e /login são autenticadas e devem conter o campo 'token', ou então você deve enviar o token no header 'authorization'
* Todos os requests devem conter o Content-Type: application/json
* Em todas as rotas autenticadas subintende-se que o token esta no header para facilitar a visualização dos exemplos
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
  "email": "thiago@gmail.com",
  "password": "123"
}

// Resposta de sucesso
{
  "success": true,
  "message": "Logged-in!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb0BnbWFpbC5jb20iLCJfaWQiOiI1ZGM4OGUzNzY4ZTdlMTU0NmU1MzY5YTAiLCJuYW1lIjoiVGVzdGUgdXNlciAyIiwiaWF0IjoxNTczNDgxNDU5LCJleHAiOjE1NzM1Njc4NTl9.pjyh8vLwz9eTMrdC_fMjjcYM4uW2cS0Evuohn6aTOz8"
}
```


Validar token e retornar dados do token informado se o token for válido

GET http://localhost:8357/api/me?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaWFnb0BnbWFpbC5jb20iLCJfaWQiOiI1ZGM4NmNmNmI1Nzk4MTM1ZDFkYzQyOWQiLCJuYW1lIjoiVGVzdGUgdXNlciAyIiwiaWF0IjoxNTczNDE2ODg5LCJleHAiOjE1NzM1MDMyODl9.9Mdxl5uukxjadNq8otK-kkBJLwAOev5JAxgPXq0cKs8


```
// Resposta de sucesso
{
  "success": true,
  "data": {
    "email": "thiago@gmail.com",
    "_id": "5dc88e3768e7e1546e5369a0",
    "name": "Teste user 2",
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
GET http://localhost:8357/api//v1/users/5dc86cf6b5798135d1dc429d

// resposta do metodo
{
  "success": true,
  "data": {
    "_id": "5dc86cf6b5798135d1dc429d",
    "email": "thiago@gmasdil.com",
    "name": "thiago",
    "creationDate": "2019-11-11T20:03:02.561Z",
    "contatos": [
      {
        "_id": "5dc89171ed215861986406d7",
        "type": "email0",
        "value": "thiagotestes.combr",
        "user": "5dc86cf6b5798135d1dc429d",
        "__v": 0
      },
      ...
    ]
  }
}

```

Listar todos os usuarios com paginação via query param
```
GET http://localhost:8357/api/v1/users/list?skip=0&limit=5

//resposta do request
{
  "total": 4,
  "data": [
    {
      "_id": "5dc86cf6b5798135d1dc429d",
      "email": "thiago@gmasdil.com",
      "name": "thiago",
      "creationDate": "2019-11-11T20:03:02.561Z",
      "contatos": [
        {
          "_id": "5dc89171ed215861986406d7",
          "type": "email0",
          "value": "thiagotestes.combr",
          "user": "5dc86cf6b5798135d1dc429d",
          "__v": 0
        },
          ...
      ]
    },
    {
      "_id": "5dc88e3768e7e1546e5369a0",
      "email": "thiago@gmail.com",
      "name": "Teste user 2",
      "creationDate": "2019-11-10T22:24:55.872Z",
      "contatos": [
        {
          "_id": "5dc88e3868e7e1546e5369a1",
          "type": "telefone",
          "value": "42999981464",
          "user": "5dc88e3768e7e1546e5369a0",
          "__v": 0
        },
        ...
      ]
    }
    ...
  ]
}
```


Listar todos os usuarios usando agregate para filtragem e acesso a dados de outra collection
```
GET http://localhost:8357/api/v1/users/filter?name=thiago&date=2019-11-11

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
  "email": "thiago@gmail.com",
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
    "email": "hagy@gmail.com",
    "password": "$2a$10$qnR1vndiSyari36qKYLCZ.l77130HNW5VAx3/BR6dv3pbHA1EbhO2",
    "name": "hagy",
    "creationDate": "2019-11-11T14:20:45.613Z",
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
  "email": "thiago@gmasdil.com",
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
