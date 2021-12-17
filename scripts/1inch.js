const fetch = require("node-fetch");
const baseURL = (chainId) => `https://api.1inch.exchange/v3.0/${chainId}/tokens`

async function get1inchTokenList(chainId) {
    const response = await fetch(baseURL(chainId))
    if (!response.ok) return []

    const tokens = (await response.json()).tokens

    return Object.keys(tokens).map((x) => ({chainId, ...tokens[x]}))
}


exports.get1inchTokenList = get1inchTokenList