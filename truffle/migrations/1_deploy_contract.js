const BuyMeACoffee= artifacts.require("./BuyMeACoffee.sol");

module.exports = async function (deployer) {
  await deployer.deploy(BuyMeACoffee);
  
};
