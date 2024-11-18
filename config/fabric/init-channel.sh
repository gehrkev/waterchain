#!/bin/bash

# Esperar o peer iniciar
sleep 10

# Criar canal
peer channel create -o orderer.waterchain.com:7050 -c waterchain-channel -f ./channel-artifacts/channel.tx --outputBlock ./channel-artifacts/waterchain-channel.block

# Juntar ao canal
peer channel join -b ./channel-artifacts/waterchain-channel.block

# Atualizar anchor peers
peer channel update -o orderer.waterchain.com:7050 -c waterchain-channel -f ./channel-artifacts/Org1MSPanchors.tx