const BuyMeACoffeeContract = artifacts.require("BuyMeACoffee");
const { ether, balance } = require('@openzeppelin/test-helpers');

const main = async (cb) => {
    try {
        const buyMeACoffee = await  BuyMeACoffeeContract.deployed();

        const tip = ether("1");

        const owner = (await web3.eth.getAccounts())[0];
        const tipper= (await web3.eth.getAccounts())[2];
        const tipper2= (await web3.eth.getAccounts())[3];
        const tipper3= (await web3.eth.getAccounts())[4];
        let tipperTracker = await balance.tracker(tipper);

        let txn = await buyMeACoffee.buyCoffee("Carolina", "You're the best!", {from: tipper, value: tip});
        let txn2 =await buyMeACoffee.buyCoffee("Vitto", "Amazing teacher", {from: tipper2, value: tip});
        let txn3 =await buyMeACoffee.buyCoffee("Kay", "I love my Proof of Knowledge", {from: tipper3, value: tip});

        console.log(await tipperTracker.delta());

        console.log(await web3.eth.getBalance(buyMeACoffee.address));
        console.log(await web3.eth.getBalance(tipper));
        console.log(await web3.eth.getBalance(tipper2));
        console.log(await web3.eth.getBalance(tipper3));
        console.log(await web3.eth.getBalance(owner));
        
        console.log(txn);
        console.log(txn.logs[0].args);

        console.log(txn2);
        console.log(txn2.logs[0].args);

        console.log(txn3);
        console.log(txn3.logs[0].args);

        await buyMeACoffee.withdrawTips();


        console.log("contract balance after withdrawal");
        console.log(await web3.eth.getBalance(buyMeACoffee.address));
        console.log("owner after withdrawal");
        console.log(await web3.eth.getBalance(owner));
       
    } catch(err) {
        console.log(err);
    }
    cb();
}

module.exports = main;