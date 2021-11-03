const localList = require("./erc20-list.json");
const axios = require("axios");
// const tlist = require("../../../dist/v0.0.21/1/tokens.json");

const getERC20List = async () => {
  await axios
    .get("https://api.coingecko.com/api/v3/coins/list")
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

/**
 * @param { Array<{name:string, id: string, symbol:string, address: string}> } tokenList
 */
const validator = async (tokenList) => {
  // const erc20List = (await getErc20List()) || localList;
  const erc20List = localList.data;
  let res = 1;
  const errArr = [];
  for (let i = 0; i < tokenList.length; i++) {
    const token = tokenList[i];
    const isInList = erc20List.filter((item) => {
      if (item.platform) {
        return (
          token.address.toLowerCase() ==
          item.platform.token_address.toLowerCase()
        );
      }
    });
    if (!isInList.length) {
      errArr.push(token);
      res = errArr;
      // const ret = await validate(token);
      // if (!ret) {
      //   res = new Error('invalid erc20 token', token);
      // }
    }
  }
  return res;
};

/**
 * @param {name: string, id: string, symbol: string} token
 */
const validate = async (token) => {
  let final = 0;
  const address = token.address;
  if (!address) {
    return new Error("contract address is needed");
  }
  if (!address.length == 42) {
    return new Error("invalid erc20 contract format");
  }

  const url = `https://ffs9hp5u9e.execute-api.us-east-1.amazonaws.com/api/verify/${address}`;
  await axios
    .get(url)
    .then((res) => {
      // console.log(res)  open to check the res
      final = 1;
    })
    .catch((e) => {
      final = 0;
    });
  return final;
};

// validator(tlist.tokens);

exports.erc20Validator = validator;
exports.validate = validate;
