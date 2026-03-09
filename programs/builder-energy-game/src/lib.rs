use anchor_lang::prelude::*;

declare_id!("5kUzw8RGMrZS2LLjq39NZfjzK22uoqv2SkjNyiRDc4qk");

#[program]
pub mod builder_energy_game {
    use super::*;

    pub fn create_builder(ctx: Context<CreateBuilder>, name: String) -> Result<()> {
        let builder = &mut ctx.accounts.builder;

        builder.name = name;
        builder.energy = 100;
        builder.user = *ctx.accounts.user.key;

        Ok(())
    }

    pub fn code(ctx: Context<Code>) -> Result<()> {
        let builder = &mut ctx.accounts.builder;

        if builder.energy >= 10 {
            builder.energy -= 10;
        } else {
            builder.energy = 0;
        }

        Ok(())
    }

    pub fn rest(ctx: Context<Rest>) -> Result<()> {
        let builder = &mut ctx.accounts.builder;

        builder.energy = (builder.energy + 10).min(100);

        Ok(())
    }

    pub fn coffee(ctx: Context<Coffee>) -> Result<()> {
        let builder = &mut ctx.accounts.builder;

        builder.energy = (builder.energy + 5).min(100);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateBuilder<'info> {
    #[account(init, payer = user, space = 8 + 64)]
    pub builder: Account<'info, Builder>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Code<'info> {
    #[account(mut)]
    pub builder: Account<'info, Builder>,
}

#[derive(Accounts)]
pub struct Rest<'info> {
    #[account(mut)]
    pub builder: Account<'info, Builder>,
}

#[derive(Accounts)]
pub struct Coffee<'info> {
    #[account(mut)]
    pub builder: Account<'info, Builder>,
}

#[account]
pub struct Builder {
    pub name: String,
    pub energy: u8,
    pub user: Pubkey,
}