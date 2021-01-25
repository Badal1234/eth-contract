var DappToken = artifacts.require("./DappToken.sol")

contract('DappToken',(accounts)=>{
    it('sets total supply upon initialization',()=>{
        return DappToken.deployed().then((instance)=>{
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((totalSupply)=>{
            console.log(totalSupply)
            assert.equal(totalSupply.toNumber(), 1000000, 'equal to 1 million')
            return tokenInstance.balanceOf(accounts[0])
        }).then((adminBalance)=>{
             assert.equal(adminBalance.toNumber(), 1000000,'admin balance is equal 1 million')
            // return tokenInstance.transfer.call(0x5517e0D6f1368FE9B7b31f2A92F695cbc17BDFD2, 0999999999999999999999999999)
        })
    })
    

    it('transfer owenrship',()=>{
        return DappToken.deployed().then((instance)=>{
            tokenInstance = instance;
            return tokenInstance.transfer.call('0x5517e0D6f1368FE9B7b31f2A92F695cbc17BDFD2',099999999)
        }).then((assert.fail)).catch((error)=>{
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert')
            return tokenInstance.transfer(accounts[1], 10000)
            
        }).then((receipt)=>{
            console.log(receipt.logs)
            return tokenInstance.balanceOf(accounts[1])
        }).then((sendBalance)=>{
            assert.equal(sendBalance, 10000, 'balance is send')
            return tokenInstance.balanceOf(accounts[0])
        }).then((balance)=>{
            console.log(balance)
        })
    })

    it('Approve the spender',()=>{
        return DappToken.deployed().then((instance)=>{
            tokenInstance = instance
            return tokenInstance.approve.call(accounts[1], 10000)
        }).then((receipt)=>{
            return tokenInstance.approve(accounts[1], 10000)
        }).then((allowance)=>{
            return tokenInstance.allowance(accounts[0], accounts[1])
        }).then((allowance)=>{
        assert.equal(allowance.toNumber(), 10000, 'equal to 10000')
        return tokenInstance.transferFrom(accounts[1], accounts[2], 100)
        }).then((success)=>{
            console.log(success)
            assert.equal(success, true, 'transferfrom return true')
            return tokenInstance.allowance(accounts[0], accounts[1])
        }).then((bal)=>{
            assert.equal(bal.toNumber(), 10000 - 1000, 'tranfer of unsuccessful')
        })
    })
})

