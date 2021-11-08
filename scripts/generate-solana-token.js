const SolanaTokens = require("../src/solana/solana.json");
const { addChainId, generateTokenList } = require("./shared");

const SolanaMaskTokenList = generateTokenList([...addChainId(SolanaTokens, 1)], {
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

if (SolanaMaskTokenList) {
  process.stdout.write(JSON.stringify(SolanaMaskTokenList));
} else {
  console.error("errors on build solana token:");
  console.error(validate.errors);
  process.exit(1);
}
