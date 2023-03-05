/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-truffle5");
require('solidity-coverage');
require('solidity-docgen');

module.exports = {
  solidity: "0.8.18",
  docgen: {}
};
