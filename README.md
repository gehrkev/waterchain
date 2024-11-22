# WaterChain

## Visão Geral
WaterChain é uma plataforma blockchain que auxilia o monitoramento e validação da qualidade da água através de um sistema descentralizado de verificação multi-organizacional.

### Organizações Participantes
1. **Agências Ambientais**: Realizam medições e registram dados primários
2. **Laboratórios Independentes**: Validam medições e realizam contra-provas
3. **Órgãos Reguladores**: Supervisionam o processo e aplicam regulamentações

### Dados Monitorados
- pH
- Temperatura
- Dados Microbiológicos
- Composição Química
- Localização e Timestamp
- Histórico de Validações

### Processo de Validação
1. Agência submete medição
2. Laboratório valida dados técnicos
3. Órgão regulador aprova conformidade
4. Registro torna-se permanente após consenso

## Pré-requisitos
- Docker
- Docker Compose

> **Nota para usuários Windows**: Com as versões mais recentes do Docker Desktop para Windows, não é necessário instalar o WSL2. O Docker Desktop já inclui tudo necessário para rodar os containers.

## Ambientes

### Desenvolvimento

1. Clone o repositório:
```bash
git clone https://github.com/gehrkev/waterchain.git
cd waterchain
```

2. Inicie o ambiente de desenvolvimento:
```bash
docker compose -f docker-compose.dev.yml up -d
```

O ambiente será configurado automaticamente, incluindo:
- Download e configuração dos binários do Fabric
- Geração dos artefatos necessários
- Hot reload para frontend e backend
- Volumes montados para desenvolvimento

#### Serviços (Desenvolvimento)
- Frontend: http://localhost:4001
- Backend: http://localhost:4000
- Postgres: localhost:5432

### Produção

1. Build e inicialização:
```bash
docker compose up -d
```

O ambiente de produção inclui:
- Builds otimizados
- Configurações de produção
- Sem ferramentas de desenvolvimento
- Ambiente isolado e seguro

#### Serviços (Produção)
- Frontend: http://localhost
- Backend: http://localhost:4000
- Postgres: localhost:5432

## Comandos Úteis

### Desenvolvimento
```bash
# Iniciar ambiente dev
docker compose -f docker-compose.dev.yml up -d

# Parar ambiente dev
docker compose -f docker-compose.dev.yml down

# Reconstruir imagens dev
docker compose -f docker-compose.dev.yml build

# Ver logs dev
docker compose -f docker-compose.dev.yml logs -f
```

### Produção
```bash
# Iniciar ambiente prod
docker compose up -d

# Parar ambiente prod
docker compose down

# Reconstruir imagens prod
docker compose build

# Ver logs prod
docker compose logs -f
```

### Acesso aos Containers

```bash
# Ambiente de desenvolvimento
docker exec -it waterchain-dev-1 sh
docker exec -it waterchain-fabric-tools-1 bash

# Ambiente de produção
docker exec -it waterchain-frontend-1 sh
docker exec -it waterchain-api-1 sh
```

## Desenvolvimento

- O código fonte está montado em volumes no ambiente de desenvolvimento
- Alterações são refletidas automaticamente com hot reload
- Use o ambiente de desenvolvimento para codificação e testes
- Use o ambiente de produção para testes de integração e deployment