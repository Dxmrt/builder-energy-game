import { Connection, clusterApiUrl } from "@solana/web3.js";
import { CLUSTER, DEFAULT_RPC_ENDPOINT } from "@/lib/constants";

export class SolanaService {
  private static connection: Connection | null = null;

  static getConnection(): Connection {
    if (!this.connection) {
      const endpoint =
        DEFAULT_RPC_ENDPOINT || clusterApiUrl(CLUSTER as "devnet");
      this.connection = new Connection(endpoint, "confirmed");
    }
    return this.connection;
  }
}

