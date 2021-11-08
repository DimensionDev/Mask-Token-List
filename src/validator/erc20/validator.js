const fetch = require("node-fetch");
const https = require("https");
const localList = require("./erc20-list.json");
const existingERC20Addressed = new Set();

let listCache = {};
const getERC20List = async () => {
  if (listCache && listCache.data) return listCache;
  try {
    const url =
      "https://web-api.coinmarketcap.com/v1/cryptocurrency/map?aux=status,platform&listing_status=active,untracked&sort=cmc_rank";
    const options = {
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
    const res = await fetch(url, options);
    listCache = await res.json().data;
  } catch (e) {
    listCache = localList;
  }
  return listCache;
};

/**
 * @param { Array<{name:string, id: string, symbol:string, address: string}> } tokenList
 */
const validateExistenceCMC = async (tokenList) => {
  let res = 1;
  const errArr = [];
  const list = await getERC20List();
  if (!existingERC20Addressed.size) {
    list.data.forEach((item) => {
      if (item.platform && item.platform.token_address) {
        existingERC20Addressed.add(item.platform.token_address.toLowerCase());
      }
    });
  }

  tokenList.forEach((token) => {
    if (!existingERC20Addressed.has(token.address.toLowerCase())) {
      errArr.push(token);
      res = errArr;
    }
  });
  return res;
};

exports.validateExistenceCMC = validateExistenceCMC;
