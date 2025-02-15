# Find a pet API 🐶🐱

As an ONG, register pets available to be adopted. As users, find for pets to adopt by city or pet details.

## How to run it?

1. Configure your `.env` using `.env.example`
2. Install all dependencies

```
npm install
```

3. Make sure to run docker compose file to get your database running.

```
docker compose up
```


4. Run in development mode or prod mode
```
DEV: npm run dev
PROD: npm run start
```

![image](https://github.com/user-attachments/assets/e993ed79-5441-43f1-8e84-43590efcca52)

### Application Rules (Regras da aplicação)

EN

- [x] It must be possible to register a pet.
- [x] It must be possible to list all available pets for adoption in a city.
- [x] It must be possible to filter pets by their characteristics.
- [x] It must be possible to view details of a pet for adoption.
- [x] It must be possible to register as an organization (ORG).
- [x] It must be possible to log in as an ORG.

### Business Rules

- [x] To list pets, the city must be provided.
- [x] An ORG must have an address and a WhatsApp number.
- [x] A pet must be linked to an ORG.
- [x] The user who wants to adopt will contact the ORG via WhatsApp.
- [x] All filters, besides the city, are optional.
- [x] For an ORG to access the application as an admin, it must be logged in.

PT-BR

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
