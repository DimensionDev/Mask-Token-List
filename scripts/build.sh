#!/usr/bin/env bash

VERSION=$(node -p -e "require('./package.json').version")
CHAIN[0]=dist/v$VERSION
CHAIN[1]=dist/v$VERSION/1
CHAIN[3]=dist/v$VERSION/3
CHAIN[4]=dist/v$VERSION/4
CHAIN[56]=dist/v$VERSION/56
CHAIN[97]=dist/v$VERSION/97
CHAIN[137]=dist/v$VERSION/137
CHAIN[80001]=dist/v$VERSION/80001

mkdir -p dist

# build the latest version
for i in "${!CHAIN[@]}"; do
  printf "Generate for chain id: %s to folder: %s\n" "$i" "${CHAIN[$i]}"
  mkdir -p ${CHAIN[$i]}
  touch "${CHAIN[$i]}/tokens.json"
  node scripts/generate-erc20.js $i > "${CHAIN[$i]}/tokens.json"
done

node scripts/generate-erc721.js > "dist/mask_nft.json"

# build the current version
cp dist/mask_nft.json "dist/mask_nft_v_$(echo $VERSION | sed "s/\./_/g").json"

echo "v${VERSION} is built."

