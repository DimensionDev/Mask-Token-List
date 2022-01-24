const defaultRules = [
  [""], // 5
  ["is_open_source", "can_take_back_ownership"], // 10
  ["is_honeypot"], // 20
];
// const defaultMaxRisk = 60;
const GO_PLUS_LABS_ROOT_URL = "https://api.gopluslabs.io";
const GO_PLUS_TOKEN_SECURITY_URL = "api/v1/token_security";
const fetch = require("node-fetch");
const safeChainIds = [
  1, 3, 4, 10, 56, 97, 100, 122, 137, 250, 288, 42161, 42220, 80001,
];
let supportChains = [];

const test = {
  tokens: [
    {
      chainId: 1,
      address: "0x408e41876cccdc0f92210600ef50372656052a38",
      decimals: 9,
      name: "AWOOL",
      symbol: "aWOOL",
      logoURI:
        "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x5eDE350E84223fb50775fD91a723F2ca71034cf7/logo.png",
      riskRate: 0,
      riskDetail: null,
    },
  ],
};
const getSupportedChains = async () => {
  if (supportChains.length) return;
  try {
    await fetch("https://api.gopluslabs.io/api/v1/supported_chains")
      .then((r) => r.json())
      .then(({ result }) => {
        if (result.length) {
          result.map((item) => [supportChains.push(Number(item.id))]);
        }
      });
  } catch (e) {
    return;
  }
};

// const sleep = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

const riskCheck = async (list, rules) => {
  await getSupportedChains();

  const rule = rules ?? defaultRules;
  const chainId = list.tokens[0].chainId;
  const temp = JSON.parse(JSON.stringify(list));

  if (!temp.tokens.length) return;
  for (let i = 0; i < temp.tokens.length; i++) {
    const item = temp.tokens[i];
    const riskD =
      (await singleCheck(chainId, item.address.toLowerCase())) ?? null;
    const riskR = riskD ? calculateRiskRate(riskD, rule) : null
    item.riskRate = riskR;
    item.riskDetail = riskD;
  }
  return temp;
};

const calculateRiskRate = (detail, rule) => {
  let res = 0;
  const keys = Object.keys(detail);
  const map = [5, 10, 20];
  map.forEach((num, index) => {
    rule[index].forEach((item) => {
      if (keys.includes(item) && detail[item] === "1") {
        res += num;
      }
    });
  });
  return res;
};

const singleCheck = async (chainId, address) => {
  if (!supportChains.includes(chainId)) return;
  if (safeChainIds.includes(chainId)) return;
  let res = null;
  const url = `${GO_PLUS_LABS_ROOT_URL}/${GO_PLUS_TOKEN_SECURITY_URL}/${chainId}?contract_addresses=${address}`;
  await fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (!data.result) return;
      res = data.result[address];
    });

  return res;
};
riskCheck(test);

exports.riskCheck = riskCheck;
