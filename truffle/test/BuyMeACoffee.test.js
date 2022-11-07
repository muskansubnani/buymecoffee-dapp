require("@openzeppelin/test-helpers/configure")({
    provider: web3.currentProvider,
    singletons: {
      abstraction: "truffle",
    },
  });
  
  const { balance, ether} = require('@openzeppelin/test-helpers');
  const BN = require('bn.js');
  const BuyMeACoffeeContract = artifacts.require("BuyMeACoffee");


  contract('BuyMeACoffeeContract', accounts => {

    let  buyMeACoffee;
    const owner = accounts[0];
    const tipper= accounts[2];
    const tipper2= accounts[3];
    const tipper3= accounts[4];
    let tipperTracker;
    let tipperTracker2;
    let tipperTracker3;
    let ownerTracker;

    before(async () => {
        buyMeACoffee = await BuyMeACoffeeContract.deployed();
    })
    
    it('deploys successfully', async function() {
    
        const address = await buyMeACoffee.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    
        })
    
    it('should update balances of contract, tippers correctly after tipping ', async function() {
    
      // Buy the owner a few coffees.
      const tip = ether("1");
      tipperTracker = await balance.tracker(tipper);
      tipperTracker2 = await balance.tracker(tipper2);
      tipperTracker3 = await balance.tracker(tipper3);
      
      await buyMeACoffee.buyCoffee("Carolina", "You're the best!", {from: tipper, value: tip});
      await buyMeACoffee.buyCoffee("Vitto", "Amazing teacher",{from: tipper2, value: tip});
      await buyMeACoffee.buyCoffee("Kay", "I love my Proof of Knowledge", {from: tipper3, value: tip});
      

      let contractBalance = await web3.eth.getBalance(buyMeACoffee.address);

      expect((await tipperTracker.delta()) * -1).to.be.at.least(1000000000000000000);
      expect((await tipperTracker2.delta()) * -1).to.be.at.least(1000000000000000000);
      expect((await tipperTracker3.delta()) * -1).to.be.at.least(1000000000000000000);

      expect(contractBalance).to.be.equal(ether('3').toString());

    //  expect((await tipperTracker.delta()).toString(), ether("1").toString(), " not correct");
      //(await ownerTracker.delta("ether")).should.be.bignumber.equal('1');
    //  (await tipperTracker.delta()).should.be.bignumber.equal(new BN(web3.utils.fromWei(1, 'ether')));
   //   (await tipperTracker2.delta('ether')).should.be.bignumber.equal('1');
    //  (await tipperTracker3.delta('ether')).should.be.bignumber.equal('1');

      })


      it('should update balances of contract, owner correctly after withdrawal of tips', async function() {

        ownerTracker = await balance.tracker(owner);
        //withdraw tips
        await buyMeACoffee.withdrawTips();
      
        let contractBalanceAfterWithDrawal = await web3.eth.getBalance(buyMeACoffee.address);

        expect(contractBalanceAfterWithDrawal).to.be.equal(ether('0').toString());

        expect(await ownerTracker.delta()).to.be.closeTo(3000000000000000000, 10000000000000000);
  
      })
    


})