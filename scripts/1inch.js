const fetch = require("node-fetch");
const baseURL = (chainId) => `https://api.1inch.exchange/v3.0/${chainId}/tokens`

async function get1inchTokenList(chainId) {
    const response = await fetch(baseURL(chainId))
    if (!response.ok) return []

    const tokens = (await response.json()).tokens

    return Object.keys(tokens).map((x) => ({chainId, ...tokens[x]}))
}

async function test(chainId) {
    const a = await get1inchTokenList(chainId)
    console.log(a)
}

test(56)
exports.get1inchTokenList = get1inchTokenList