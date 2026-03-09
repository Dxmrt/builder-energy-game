"use client";

import type { BuilderAccount } from "@/types/builder";

type Props = {
  builder: BuilderAccount | null;
  isLoading: boolean;
};

export function EnergyDisplay({ builder, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
        Loading builder energy...
      </div>
    );
  }

  if (!builder) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
        No builder yet. Create your builder to start the game.
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Builder
          </h2>
          <p className="mt-1 text-lg font-medium text-zinc-900">
            {builder.name}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Owner: {builder.user.slice(0, 4)}...{builder.user.slice(-4)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Energy
          </p>
          <p className="mt-1 text-3xl font-semibold text-emerald-500">
            {builder.energy}
          </p>
        </div>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all"
          style={{ width: `${builder.energy}%` }}
        />
      </div>
    </div>
  );
}

