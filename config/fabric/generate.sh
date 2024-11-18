#!/bin/bash

# Definir o diretório de configuração do Fabric
export FABRIC_CFG_PATH=$PWD

# Criar diretórios necessários
mkdir -p crypto-config
mkdir -p channel-artifacts

# Gerar crypto material
echo "Generating crypto material..."
cryptogen generate --config=./crypto-config.yaml --output=crypto-config

# Gerar bloco genesis
echo "Generating genesis block..."
configtxgen -profile WaterchainOrdererGenesis \
    -channelID system-channel \
    -outputBlock ./channel-artifacts/genesis.block

# Gerar canal de transação
echo "Generating channel transaction..."
configtxgen -profile WaterchainChannel \
    -outputCreateChannelTx ./channel-artifacts/channel.tx \
    -channelID waterchain-channel

# Gerar anchor peers
echo "Generating anchor peer update..."
configtxgen -profile WaterchainChannel \
    -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx \
    -channelID waterchain-channel \
    -asOrg Org1MSP