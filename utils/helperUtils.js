const utils = {}
utils.getRandomNumber = (max) => {
    return Math.floor(Math.random() * max * 10000);
  };


  module.exports = utils