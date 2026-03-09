"use client";

import { useCallback, useState } from "react";
import type { TransactionStatus } from "@/types/builder";

type UseTransactionsResult<T> = {
  status: TransactionStatus;
  error: string | null;
  lastResult: T | null;
  execute: (fn: () => Promise<T>) => Promise<void>;
};

export function useTransactions<T = unknown>(): UseTransactionsResult<T> {
  const [status, setStatus] = useState<TransactionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<T | null>(null);

  const execute = useCallback(async (fn: () => Promise<T>) => {
    setStatus("pending");
    setError(null);

    try {
      const result = await fn();
      setLastResult(result);
      setStatus("success");
    } catch (e: any) {
      setError(e?.message ?? "Transaction failed");
      setStatus("error");
    }
  }, []);

  return { status, error, lastResult, execute };
}

