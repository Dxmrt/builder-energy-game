import type { Metadata } from "next";
import "./globals.css";
import { SolanaProvider } from "@/providers/SolanaProvider";

export const metadata: Metadata = {
  title: "Builder Energy Game",
  description: "Play a simple on-chain energy game on Solana Devnet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
