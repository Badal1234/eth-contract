const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "tobacco negative lake differ slice tired helmet common recipe degree wasp diet";


module.exports = {
    networks:{
        development:{
            host:"127.0.0.1",
            port: 7545,
            network_id:5777
        },
        rinkeby: {
            provider: function() {
              return new HDWalletProvider(mnemonic, "wss://rinkeby.infura.io/ws/v3/1ac76c46703046268b73475165745c2c")
            },
            network_id: 4,
            skipDryRun: true,
           gas: 50000000,
           gasPrice:100
           // confirmation: 2,
            //timeoutBlocks:20000000000000000000000000000000000000
          }
    },
    contracts_directory:"./contract",
    contracts_build_directory:"./abis",
    compilers:{
        solc:{
            
            version:'^0.7.4'
            //evmVersion:'india'
        }
    }
}