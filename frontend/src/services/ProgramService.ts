import { AnchorProvider, Idl, Program, setProvider } from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import type { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import { PROGRAM_ID } from "@/lib/constants";
import idl from "@/lib/idl/builder_energy_game.json";

export type BuilderEnergyGameIdl = typeof idl & Idl;

export class ProgramService {
  private readonly connection: Connection;
  private readonly wallet: AnchorWallet | null;
  private readonly network: WalletAdapterNetwork;
  private readonly programId: PublicKey;

  constructor(
    connection: Connection,
    wallet: AnchorWallet | null,
    network: WalletAdapterNetwork,
  ) {
    this.connection = connection;
    this.wallet = wallet;
    this.network = network;
    this.programId = new PublicKey(PROGRAM_ID);
  }

  private getProvider(): AnchorProvider {
    if (!this.wallet || !this.wallet.publicKey) {
      throw new Error("Wallet not connected");
    }

    const provider = new AnchorProvider(
      this.connection,
      this.wallet,
      AnchorProvider.defaultOptions(),
    );
    setProvider(provider);
    return provider;
  }

  getProgram(): Program<BuilderEnergyGameIdl> {
    const provider = this.getProvider();
    return new Program(idl as BuilderEnergyGameIdl, this.programId, provider);
  }

  async createBuilder(name: string) {
    const program = this.getProgram();
    const builderKeypair = Keypair.generate();

    if (!this.wallet?.publicKey) {
      throw new Error("Wallet not connected");
    }

    await program.methods
      .createBuilder(name)
      .accounts({
        builder: builderKeypair.publicKey,
        user: this.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([builderKeypair])
      .rpc();

    return builderKeypair.publicKey;
  }

  async code(builder: PublicKey) {
    const program = this.getProgram();
    await program.methods.code().accounts({ builder }).rpc();
  }

  async rest(builder: PublicKey) {
    const program = this.getProgram();
    await program.methods.rest().accounts({ builder }).rpc();
  }

  async coffee(builder: PublicKey) {
    const program = this.getProgram();
    await program.methods.coffee().accounts({ builder }).rpc();
  }

  async fetchBuilder(builder: PublicKey) {
    const program = this.getProgram();
    return program.account.builder.fetch(builder);
  }
}

