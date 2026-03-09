"use client";

import { useEffect, useState, useCallback } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/hooks/useProgram";
import { useTransactions } from "@/hooks/useTransactions";
import type { BuilderAccount } from "@/types/builder";

const BUILDER_PUBKEY_STORAGE_KEY = "builder-energy-game:builder-pubkey";

export function useBuilderAccount() {
  const wallet = useWallet();
  const program = useProgram();

  const [builderPubkey, setBuilderPubkey] = useState<PublicKey | null>(null);
  const [builderAccount, setBuilderAccount] = useState<BuilderAccount | null>(
    null,
  );

  const {
    status: txStatus,
    error: txError,
    execute: executeTx,
  } = useTransactions<void | PublicKey>();

  // Load existing builder from localStorage if present
  useEffect(() => {
    const stored = window.localStorage.getItem(BUILDER_PUBKEY_STORAGE_KEY);
    if (stored) {
      try {
        const pubkey = new PublicKey(stored);
        setBuilderPubkey(pubkey);
      } catch {
        // ignore invalid stored key
      }
    }
  }, []);

  const refreshBuilder = useCallback(
    async (pubkey: PublicKey | null = builderPubkey) => {
      if (!pubkey) return;
      const account = await program.fetchBuilder(pubkey);
      setBuilderAccount({
        name: account.name,
        energy: account.energy,
        user: account.user.toBase58(),
      });
    },
    [builderPubkey, program],
  );

  useEffect(() => {
    if (builderPubkey) {
      void refreshBuilder(builderPubkey);
    } else {
      setBuilderAccount(null);
    }
  }, [builderPubkey, refreshBuilder]);

  const createBuilder = useCallback(
    async (name: string) => {
      if (!wallet.connected) {
        throw new Error("Wallet must be connected");
      }

      await executeTx(async () => {
        const pubkey = await program.createBuilder(name);
        setBuilderPubkey(pubkey);
        window.localStorage.setItem(
          BUILDER_PUBKEY_STORAGE_KEY,
          pubkey.toBase58(),
        );
        await refreshBuilder(pubkey);
      });
    },
    [wallet.connected, executeTx, program, refreshBuilder],
  );

  const code = useCallback(async () => {
    if (!builderPubkey) throw new Error("No builder account");
    await executeTx(async () => {
      await program.code(builderPubkey);
      await refreshBuilder(builderPubkey);
    });
  }, [builderPubkey, executeTx, program, refreshBuilder]);

  const rest = useCallback(async () => {
    if (!builderPubkey) throw new Error("No builder account");
    await executeTx(async () => {
      await program.rest(builderPubkey);
      await refreshBuilder(builderPubkey);
    });
  }, [builderPubkey, executeTx, program, refreshBuilder]);

  const coffee = useCallback(async () => {
    if (!builderPubkey) throw new Error("No builder account");
    await executeTx(async () => {
      await program.coffee(builderPubkey);
      await refreshBuilder(builderPubkey);
    });
  }, [builderPubkey, executeTx, program, refreshBuilder]);

  return {
    builderPubkey,
    builderAccount,
    txStatus,
    txError,
    createBuilder,
    code,
    rest,
    coffee,
    refreshBuilder,
  };
}

