const { schema } = require("@uniswap/token-lists");
const Ajv = require("ajv");
const metadata = require("eth-contract-metadata");
const { EthereumAddress } = require("wallet.ts");
const Mainnet = require("../src/erc20/mainnet.json");
const Ropsten = require("../src/erc20/ropsten.json");
const Rinkeby = require("../src/erc20/rinkeby.json");
const Bnbt = require("../src/erc20/bnbt.json");
const { addChainId, generateTokenList } = require("./shared");

const MaskTokenList = generateTokenList(
  [
    ...addChainId(Mainnet, 1),
    ...addChainId(Ropsten, 3),
    ...addChainId(Rinkeby, 4),
    ...addChainId(Bnbt, 97),
    ...Object.keys(metadata)
      .filter((key) => {
        const record = metadata[key];
        return (
          typeof record.symbol === "string" &&
          typeof record.decimals === "number" &&
          typeof record.name === "string" &&
          new RegExp("^[ \\w.'+\\-%/À-ÖØ-öø-ÿ]+$").test(record.name) &&
          EthereumAddress.isValid(key)
        );
      })
      .map((key) => ({
        chainId: 1,
        address: key,
        symbol: metadata[key].symbol,
        decimals: metadata[key].decimals,
        name: metadata[key].name,
      })),
  ]
    .map((x) => ({
      ...x,
      address: EthereumAddress.checksumAddress(x.address),
    }))
    .sort((a, z) => {
      if (a.name > z.name) return 1;
      if (a.name < z.name) return -1;
      return 0;
    }),
  {
    name: "Mask",
    logoURI:
      "https://raw.githubusercontent.com/DimensionDev/Maskbook-Website/master/img/MB--CircleCanvas--WhiteOverBlue.svg",
    keywords: [
      "browser extension",
      "web3",
      "peer to peer",
      "encryption",
      "cryptography",
      "gundb",
      "privacy protection",
      "ownyourdata",
      "social network",
      "blockchain",
      "crypto",
      "dweb",
    ],
    timestamp: new Date().toISOString(),
  }
);

const ajv = new Ajv();
const validate = ajv.compile(schema);
if (validate(MaskTokenList)) {
  process.stdout.write(JSON.stringify(MaskTokenList));
} else {
  console.error("errors on build erc20:");
  console.error(validate.errors);
  process.exit(1);
}
