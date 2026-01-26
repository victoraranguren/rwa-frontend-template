import { AssetRegistryData } from "./asset-registry";
import { address, createSolanaRpc } from "@solana/kit";
import { fetchMint } from "@solana-program/token-2022";
import { env } from "process";

export interface TokenMetadataUI {
  mint: string,
  symbol: string,
  name: string,
  decimals: number,
  supply: number,
  authority: string,
  programId: string,
}

export const getTokenMetadataByAssetRegistryCollection = async (
  assetRegistryAccounts: AssetRegistryData[],
) => {

  // Get a single asset by its ID
  const url = `https://devnet.helius-rpc.com/?api-key=${env.NEXT_PUBLIC_API}`;

  const getAsset = async (id: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-request-id",
        method: "getAsset",
        params: {
          id: id,
        },
      }),
    });

    const data = await response.json();
    return data.result;
  };


  const mintAccounts = Promise.all(assetRegistryAccounts.map(async assetRegistryAccount => {
    const asset = await getAsset(assetRegistryAccount.data.mint);

    const tokenWithMetadata = {
      mint: assetRegistryAccount.data.mint,
      symbol: asset.content.metadata.symbol,
      name: asset.content.metadata.name,
      decimals: asset.token_info.decimals,
      supply: asset.token_info.supply / Math.pow(10, asset.token_info.decimals),
      authority: asset.token_info.mint_authority,
      programId: assetRegistryAccount.programAddress,
    }

    return tokenWithMetadata

  }))

  return mintAccounts
};