"use client";

import { FormEvent, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useBuilderAccount } from "@/hooks/useBuilderAccount";

export function GameControls() {
  const wallet = useWallet();
  const [name, setName] = useState("");

  const {
    builderPubkey,
    builderAccount,
    txStatus,
    txError,
    createBuilder,
    code,
    rest,
    coffee,
  } = useBuilderAccount();

  const isSubmitting = txStatus === "pending";

  const handleCreateBuilder = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    await createBuilder(name.trim());
  };

  return (
    <div className="mt-8 space-y-6">
      <form
        onSubmit={handleCreateBuilder}
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Create Builder
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Start by creating a builder on Solana Devnet. This will initialize
          your on-chain energy state.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Builder name"
            className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-400"
            disabled={!wallet.connected || isSubmitting}
          />
          <button
            type="submit"
            disabled={!wallet.connected || isSubmitting || !name.trim()}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {isSubmitting ? "Creating..." : "Create Builder"}
          </button>
        </div>
        {!wallet.connected && (
          <p className="mt-2 text-xs text-amber-600">
            Connect your wallet to create a builder.
          </p>
        )}
      </form>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Actions
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Spend or restore energy by calling on-chain instructions.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => void code()}
            disabled={!builderPubkey || isSubmitting}
            className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {isSubmitting ? "Processing..." : "Code (-10)"}
          </button>
          <button
            type="button"
            onClick={() => void coffee()}
            disabled={!builderPubkey || isSubmitting}
            className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {isSubmitting ? "Processing..." : "Coffee (+5)"}
          </button>
          <button
            type="button"
            onClick={() => void rest()}
            disabled={!builderPubkey || isSubmitting}
            className="rounded-xl bg-sky-500 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {isSubmitting ? "Processing..." : "Rest (+10)"}
          </button>
        </div>

        <div className="mt-4 text-xs text-zinc-500">
          {builderPubkey && (
            <p>
              Builder account:{" "}
              <span className="font-mono">
                {builderPubkey.toBase58().slice(0, 8)}...
                {builderPubkey.toBase58().slice(-8)}
              </span>
            </p>
          )}
          {builderAccount && (
            <p className="mt-1">
              Current on-chain energy:{" "}
              <span className="font-semibold">{builderAccount.energy}</span>
            </p>
          )}
        </div>

        {txStatus === "pending" && (
          <p className="mt-3 text-xs text-zinc-500">
            Sending transaction to Solana Devnet...
          </p>
        )}
        {txStatus === "success" && (
          <p className="mt-3 text-xs text-emerald-600">
            Transaction confirmed. State updated from chain.
          </p>
        )}
        {txStatus === "error" && txError && (
          <p className="mt-3 text-xs text-red-600">Error: {txError}</p>
        )}
      </div>
    </div>
  );
}

