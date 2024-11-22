#!/bin/sh

# Função para gerar JWT secret se necessário
generate_jwt_secret() {
    # Verificar se o arquivo .env existe
    if [ ! -f /app/backend/.env ]; then
        echo "Arquivo .env não encontrado. Criando a partir do .env.example..."
        cp /app/backend/.env.example /app/backend/.env
    fi

    # Substituir o placeholder pelo segredo gerado, se necessário
    if grep -q "your-super-secret-key-change-this-in-production" /app/backend/.env; then
        NEW_SECRET=$(openssl rand -hex 64)
        sed -i "s/your-super-secret-key-change-this-in-production/$NEW_SECRET/" /app/backend/.env
        echo "JWT secret gerado e atualizado no .env."
    fi
}

# Gerar JWT secret se necessário
generate_jwt_secret

# Iniciar o backend em desenvolvimento
cd /app/backend
PORT=4000 npm run dev &

# Iniciar o frontend em desenvolvimento
cd /app/frontend
PORT=4001 HOST='0.0.0.0' npm start &

# Manter o container rodando
wait