"use client";

import { WalletConnect } from "@/components/WalletConnect";
import { EnergyDisplay } from "@/components/EnergyDisplay";
import { GameControls } from "@/components/GameControls";
import { useBuilderAccount } from "@/hooks/useBuilderAccount";

export default function Home() {
  const { builderAccount, txStatus } = useBuilderAccount();

  const isLoading = txStatus === "pending" && !builderAccount;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="flex w-full max-w-3xl flex-col gap-8 rounded-3xl bg-white p-8 shadow-lg sm:p-10">
        <header className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Builder Energy Game
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Play a minimal on-chain game on Solana Devnet. Your builder
                starts with 100 energy — coding consumes it, coffee and rest
                restore it.
              </p>
            </div>
          </div>
          <WalletConnect />
        </header>

        <EnergyDisplay builder={builderAccount} isLoading={isLoading} />

        <GameControls />
      </main>
    </div>
  );
}
