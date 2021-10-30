
const fetch = require("node-fetch");

const baseUrl = (chainId, address) =>`https://api.erc721validator.org/basic?test=5&chainId=${chainId}&contract=${address}`

async function fetchInvalidERC721ContractResult (address) {
    const response = await fetch(baseUrl(address))
    if (!response.ok) return {data: {result: false}}
    const json = await response.json()
    return json.data
}

function delay(num) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2)
      }, num)
    })
  }

async function invalidContractList (tokensList) {
    const tokens = []
    for (let i = 0; i < tokensList.length; i++) {
        const token = tokensList[i]
        
        const result = await fetchInvalidERC721ContractResult(token.chainId, token.address)
        if (!result.result) tokens.push(tokens)
        await delay(1000)
    }

    return tokens
}

exports.invalidContractList = invalidContractList;