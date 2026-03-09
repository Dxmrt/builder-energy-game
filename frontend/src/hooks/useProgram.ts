"use client";

import { useMemo } from "react";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ProgramService } from "@/services/ProgramService";

export function useProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const programService = useMemo(() => {
    return new ProgramService(connection, wallet, WalletAdapterNetwork.Devnet);
  }, [connection, wallet]);

  return programService;
}

