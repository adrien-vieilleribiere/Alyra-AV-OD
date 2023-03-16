# Vote On Chain

Ce projet présente une application décentralisée basée sur la box truffle react.

Le Backend est écrit en solidity, testé en javascript, et déployé via truffle. 
Il correspond au sous-dossier [truffle](./truffle) 
et il a été déployé sur Goerli, Mumbai, et en local. 

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
### Frontend

```sh
cd client
npm install
npm npm run build
npm start
```

