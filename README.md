# Vote On Chain

Ce projet présente une application décentralisée basée sur la box truffle react.

Le Backend est écrit en solidity, testé en javascript, et déployé via truffle. 
Il correspond au sous-dossier [truffle](./truffle) 
et il a été déployé en local et 
- sur Goerli : https://goerli.etherscan.io/address/0x8146AbBdA6416DfCC0E86b24A9294174f3Aa04e1
- sur Mumbai : https://mumbai.polygonscan.com/address/0xfabff559c69422517ce7290bf86c39217237815b

Le frontend est quand à lui concut avec React, Web3 et MaterialUi.
Correspondant au sous-dossier [client](./client), 
il est déployé sur https://alyra-av-od.vercel.app/.

Une vidéo de démonstration du fonctionnement de l'application est accessible sur 
[TODO]

## Installation
```sh
gh repo clone adrien-vieilleribiere/Alyra-AV-OD
```

### Backend
```sh
cd truffle
npm install
truffle migrate
# add --network goerli or --network=mumbai for a public networks deployment
truffle test
```

To test the contract from a specific state:
```sh
mv truffle/docs/02_deployTest.js truffle/migrations/02_deployTest.js
```
Adapt `02_deployTest.js` to the initial situation you want and run
```sh
truffle migrate --f 2 --reset 
```
### Frontend

```sh
cd client
npm install
npm npm run build
npm start
```

## Remarques sur le rendu


