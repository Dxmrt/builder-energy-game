import * as anchor from "@coral-xyz/anchor";

describe("builder-energy-game", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BuilderEnergyGame as anchor.Program<any>;

  const builder = anchor.web3.Keypair.generate();

  it("Create builder", async () => {
    await program.methods
      .createBuilder("Sonia")
      .accounts({
        builder: builder.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([builder])
      .rpc();

    console.log("Builder created");
  });

  it("Code", async () => {
    await program.methods
      .code()
      .accounts({
        builder: builder.publicKey,
      })
      .rpc();

    console.log("Builder coded");
  });

  it("Drink coffee", async () => {
    await program.methods
      .coffee()
      .accounts({
        builder: builder.publicKey,
      })
      .rpc();

    console.log("Builder drank coffee");
  });

  it("Rest", async () => {
    await program.methods
      .rest()
      .accounts({
        builder: builder.publicKey,
      })
      .rpc();

    console.log("Builder rested");
  });

});