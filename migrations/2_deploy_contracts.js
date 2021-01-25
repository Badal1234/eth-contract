
const DappToken = artifacts.require('DappToken')
module.exports = async(deployer) =>{
    deployer.deploy(DappToken, 10000000000000)
}