## Executando localmente

Para executar o projeto localmente, você precisará ter o [Node.js](https://nodejs.org) instalado em sua máquina pois ele é o principal requisito para executar o projeto em modo de desenvolvimento. Dentre os requisitos estão:

- [Git](https://git-scm.com) - Sistema de controle de versão distribuído.
- [Node.js](https://nodejs.org) - Ambiente de execução Javascript server-side.
- [Yarn](https://yarnpkg.com) - Gerenciador de pacotes para o Node.js. (ou outro gerenciador de pacotes)
- [NPM](https://www.npmjs.com) - Gerenciador de pacotes para o Node.js. (ou outro gerenciador de pacotes)
- [Docker](https://www.docker.com) - Plataforma de código aberto para construir, enviar e executar aplicativos em contêineres.
- [Prisma](https://www.prisma.io) - ORM para Node.js e TypeScript.

### Passo a passo

1. Clone o repositório em sua máquina local:

```bash
git clone https://github.com/jhonywalkeer/fiap-replacement-phase.git
```

2. Acesse a pasta do projeto:

```bash
cd fiap-replacement-phase
```

3. Instale as dependências do projeto (com gerenciado de pacotes de sua preferência, neste exemplo utilizaremos o npm):

```bash

npm install

```

4. Crie uma imagem docker do postgres para o projeto, você pode executar o seguinte comando:

```bash

docker run --name fiap-replacement-phase -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres

```

Com esse comando você irá criar um container docker com o postgres na porta 5432 com host `localhost`, usuário `postgres` e senha `1234`.

5. Copie os valores que estao no arquivo .env-example para um novo arquivo chamado .env e altere os valores de acordo com as configurações do seu banco de dados e mantenhas as variaveis de ambiente que estão default no arquivo

6. Execute as migrações do banco de dados para criar as tabelas necessárias para o projeto:

```bash

npx prisma migrate dev

```

Ocorrendo tudo bem, agora basta iniciar o servidor de desenvolvimento atraves do script:

```bash

npm run start:dev

```
Os logs do servidor serão exibidos no terminal e você poderá acessar a aplicação através do endereço `http://localhost:3000`. onde para acessar a documentação da API basta acessar o endereço `http://localhost:3000/api/v1/docs` e para obter o status da aplicação basta acessar o endereço `http://localhost:3000/api/v1/health`.