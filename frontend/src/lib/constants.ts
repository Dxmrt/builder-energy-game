// Must exactly match the on-chain program ID from Rust `declare_id!`
export const PROGRAM_ID = "5kUzw8RGMrZS2LLjq39NZfjzK22uoqv2SkjNyiRDc4qk";

export const CLUSTER = "devnet" as const;

export const DEFAULT_RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT ??
  "https://api.devnet.solana.com";

