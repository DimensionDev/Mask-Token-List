const axios = require("axios");
const { validate } = require("../erc20/validator");

/**
 * @param { Array<{name:string, id: string, symbol:string, address: string}> } tokenList
 * @param { Number } start
 * @param { Number } end
 */
const validator = (tokenList, start, end) => {
  for (let i = start || 0; i < end || tokenList.length; i++) {
    const token = tokenList[i];
    validate(toke.address);
  }
};

/**
 * @param {name: string, id: string, symbol: string, chainId} token
 */
const validate = (token, chainId) => {
  let final = 0;
  const address = token.address;
  if (!address) {
    return new Error("contract address is needed");
  }
  if (!address.length == 42) {
    return new Error("invalid erc20 contract format");
  }
  for (let i = 1; i < 9; i++) {
    const url = "https://api.erc721validator.org/basic";
    axios
      .get(url, {
        params: {
          test: i,
          contract: address,
          chainId: chainId,
        },
      })
      .then((res) => {
        final = 1;
        return res;
      })
      .catch((e) => {
        final = 2;
        return res;
      })
      .then(() => {
        console.log(
          "token name:",
          token.name,
          "passed:",
          final ? "yes" : "no",
          "token item",
          token
        );
      });
  }
};

exports.validator = validator;
exports.validate = validate;
