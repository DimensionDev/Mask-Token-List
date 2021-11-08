const fetch = require("node-fetch");
const localList = require("./erc20-list.json");
let listCache = {};
const getERC20List = async () => {
  try {
    const url =
      "https://web-api.coinmarketcap.com/v1/cryptocurrency/map?aux=status,platform&listing_status=active,untracked&sort=cmc_rank";
    const res = await fetch(url);
    listCache = await res.json();
    return listCache
  } catch (e) {
    return e
  }
};

// getERC20List();

/**
 * @param { Array<{name:string, id: string, symbol:string, address: string}> } tokenList
 */
const validateExistenceCMC = async (tokenList) => {
  let res = 1;
  const errArr = [];
  const existingERC20Addressed = new Set();
  localList.data.forEach((item) => {
    if (item.platform && item.platform.token_address) {
      existingERC20Addressed.add(item.platform.token_address.toLowerCase());
    }
  });
  tokenList.forEach((token) => {
    if (!existingERC20Addressed.has(token.address.toLowerCase())) {
      errArr.push(token);
      res = errArr;
    }
  });
  return res;
};

exports.validateExistenceCMC = validateExistenceCMC;
