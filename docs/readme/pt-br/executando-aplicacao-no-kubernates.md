## Executando a aplicação no Kubernates

Para executar o projeto localmente, você precisará ter o [Kubernetes](https://kubernetes.io) instalado em sua máquina pois ele é o principal requisito para executar o projeto. Dentre os requisitos estão:

- [Docker](https://www.docker.com) - Plataforma de código aberto para construir, enviar e executar aplicativos em contêineres.
- [Kubernetes](https://kubernetes.io) - Plataforma de código aberto para automação, escalonamento e gerenciamento de aplicativos em contêineres.
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) - Ferramenta de linha de comando para interagir com clusters Kubernetes.
- [Kind](https://kind.sigs.k8s.io) - Ferramenta para executar clusters Kubernetes em contêineres Docker de forma local.

1. Clone o repositório em sua máquina local:

```bash

git clone https://github.com/jhonywalkeer/fiap-replacement-phase.git

```

2. Acesse a pasta do projeto:

```bash

cd fiap-replacement-phase

```

3. Execute o seguinte comando para subir a aplicação no Docker primeiramente (como citado no [executando-aplicacao-no-docker](executando-aplicacao-no-docker.md) topico identificado como 3):

```bash

docker-compose up

```

4 . Faça o build da imagem docker da aplicação para que fique disponível localmente:

```bash

docker build -t fiap-replacement-phase_fiap-replacement-phase-api:latest .

```

5 . Crie um cluster Kubernetes local com o Kind referenciando o arquivo de configuração do cluster que esta na pasta `kubernates` deste repositorio:

```bash

kind create cluster --name fiap-replacement-api --config kubernates/kind-config.yaml

```

6. Verifique se o cluster foi criado corretamente:

```bash

kubectl cluster-info --context kind-fiap-replacement-api

```

6. Verifique os nodes do cluster:

```bash

kubectl get nodes

```

7. Faça com que o Kind utilize a imagem docker criada anteriormente em nosso cluster:

```bash

kind load docker-image fiap-replacement-phase_fiap-replacement-phase-api:latest --name fiap-replacement-api

```

8. Aplique o arquivo de configuração do deployment da aplicação no cluster:

```bash

kubectl apply -f kubernates/api-deployment.yam

```

8. Aplique o arquivo de configuração do banco de dados da aplicação no cluster:


```bash

kubectl apply -f kubernates/db-deployment.yaml

```

9. Aplique o arquivo de configuração de metrificação da aplicação no cluster:

```bash

kubectl apply -f kubernates/metrics.yaml

```

10. Liste os pods que estão em execução no namespace default (aguarde até que todos os pods estejam com o status `Running`):

```bash

kubectl get pods -n kube-system

```

11. Verifique se os pods estão disponíveis no cluster (aguarde até que todos os pods estejam com o status `Running`):

```bash

kubectl get pods

```


12. Verifique se os serviços estão disponíveis no cluster:

```bash

kubectl get svc

```

13. Faça o port-forward do serviço da aplicação para acessar a aplicação localmente:

```bash

kubectl port-forward service/api-svc 3000:3000 &
kubectl port-forward service/database-svc 5432:5432 &

```

14. Acesse a aplicação através do endereço `http://localhost:3000`. Onde para acessar a documentação da API basta acessar o endereço `http://localhost:3000/api/v1/docs` e para obter o status da aplicação basta acessar o endereço `http://localhost:3000/api/v1/health`.