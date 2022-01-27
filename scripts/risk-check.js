const Mainnet = require("../src/erc20/mainnet.json");
const Ropsten = require("../src/erc20/ropsten.json");
const Rinkeby = require("../src/erc20/rinkeby.json");
const Optimistic = require("../src/erc20/optimistic.json");
const Fuse = require("../src/erc20/fuse.json");
const Bsc = require("../src/erc20/bsc.json");
const Chapel = require("../src/erc20/chapel.json");
const xDai = require("../src/erc20/xdai.json");
const Fantom = require("../src/erc20/fantom.json");
const Celo = require("../src/erc20/celo.json");
const Matic = require("../src/erc20/matic.json");
const Arbiturm = require("../src/erc20/arbiturm.json");
const Mumbai = require("../src/erc20/mumbai.json");
const Aurora = require("../src/erc20/aurora.json");
const Avalanche = require("../src/erc20/avalanche.json");
const Boba = require("../src/erc20/boba.json");

const GO_PLUS_LABS_ROOT_URL = "https://api.gopluslabs.io";
const GO_PLUS_TOKEN_SECURITY_URL = "api/v1/token_security";
const fetch = require("node-fetch");

const chainId = Number.parseInt(process.argv.slice(2)[0]);

const supportedChainIds = [1, 56, 42161, 137, 128, 43114];

const chainIdToTokensMapping = {
  1: Mainnet,
  3: Ropsten,
  4: Rinkeby,
  10: Optimistic,
  56: Bsc,
  97: Chapel,
  100: xDai,
  122: Fuse,
  250: Fantom,
  288: Boba,
  137: Matic,
  42161: Arbiturm,
  42220: Celo,
  43114: Avalanche,
  80001: Mumbai,
  1313161554: Aurora,
};

const riskCheck = async () => {
  try {
    if (!supportedChainIds.includes(chainId)) {
      process.stdout.write("unsupportedChainId");
      return;
    }
    let res = null;
    const addresses = chainIdToTokensMapping[chainId]
      .map((item) => item.address)
      .join(",");
    const url = `${GO_PLUS_LABS_ROOT_URL}/${GO_PLUS_TOKEN_SECURITY_URL}/${chainId}?contract_addresses=${addresses}`;
    await fetch(url)
      .then((r) => r.json())
      .then((data) => {
        res = data.result;
      });
    process.stdout.write(JSON.stringify(res));
    return res;
  } catch {
    process.stdout.write(`risk check error for ChianId: ${chainId}`);
  }
};

riskCheck();
