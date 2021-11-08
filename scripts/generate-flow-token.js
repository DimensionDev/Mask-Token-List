const FlowTokens = require("../src/flow/flow.json");
const { addChainId, generateTokenList } = require("./shared");

const FlowMaskTokenList = generateTokenList([...addChainId(FlowTokens, 1)], {
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
});


if (FlowMaskTokenList) {
  process.stdout.write(JSON.stringify(FlowMaskTokenList));
} else {
  console.error("errors on build flow token:");
  console.error(validate.errors);
  process.exit(1);
}
