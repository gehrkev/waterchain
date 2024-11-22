#!/bin/bash

# Inicializar variáveis de ambiente
export FABRIC_CFG_PATH=/etc/hyperledger/fabric

# Verificar se os artefatos já existem
if [ ! -d "/etc/hyperledger/fabric/crypto-config" ] || [ ! -d "/etc/hyperledger/fabric/channel-artifacts" ]; then
    echo "Gerando artefatos do Fabric..."
    cd /etc/hyperledger/fabric
    ./generate.sh

    if [ $? -eq 0 ]; then
        echo "Artefatos gerados com sucesso!"
    else
        echo "Erro ao gerar artefatos!"
        exit 1
    fi
else
    echo "Artefatos do Fabric já existem."
fi

# Manter o container rodando
tail -f /dev/null