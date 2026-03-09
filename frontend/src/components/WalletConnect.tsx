"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletConnect() {
  const wallet = useWallet();

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-zinc-500">
        {wallet.connected && wallet.publicKey
          ? `Connected: ${wallet.publicKey.toBase58().slice(0, 4)}...${wallet.publicKey
              .toBase58()
              .slice(-4)}`
          : "Connect your wallet to play"}
      </span>
      <WalletMultiButton className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" />
    </div>
  );
}

