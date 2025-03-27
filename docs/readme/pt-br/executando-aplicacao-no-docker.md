## Executando a aplicação no Docker

Para executar o projeto localmente, você precisará ter o [Docker](https://www.docker.com) instalado em sua máquina pois ele é o principal requisito para executar o projeto. Dentre os requisitos estão:

- [Docker](https://www.docker.com) - Plataforma de código aberto para construir, enviar e executar aplicativos em contêineres.
- [Docker Compose](https://docs.docker.com/compose/) - Ferramenta para definir e executar aplicativos Docker multi-container.

### Passo a passo

1. Clone o repositório em sua máquina local:

```bash

git clone https://github.com/jhonywalkeer/fiap-replacement-phase.git

```

2. Acesse a pasta do projeto:

```bash

cd fiap-replacement-phase

```

3. Possuindo o Docker e Docker Compose instalados em sua máquina, execute o seguinte comando para subir a aplicação:

```bash

docker-compose up

```

4. Ocorrendo tudo bem, agora basta acessar a aplicação através do endereço `http://localhost:3000`. Onde para acessar a documentação da API basta acessar o endereço `http://localhost:3000/api/v1/docs` e para obter o status da aplicação basta acessar o endereço `http://localhost:3000/api/v1/health`.


Caso deseje parar a execução da aplicação, basta executar o comando `docker-compose down` na pasta raiz do projeto.

> ⚠️ **Observação**: Certifique-se de que as portas `3000` e `5432` estejam disponíveis em sua máquina para que a aplicação possa ser executada corretamente, a conexão com o banco de dados leva em consideracao o host como `fiap-replacement-phase-db`