# SPL Action Provider

This directory contains the SPL action provider implementation, which provides SPL token transfer functionality.

## Directory Structure

```
spl/
├── splActionProvider.ts    # Main provider with SPL token transfer functionality
├── schemas.ts              # SPL token transfer schema
├── index.ts                # Main exports
└── README.md
```

## Actions

### SPL Actions
- `transfer`: Transfer SPL tokens from the connected wallet to another address
  - Handles automatic creation of Associated Token Accounts (ATAs) for recipients
  - Validates token balances before transfer
  - Returns transaction signature

## Adding New Actions

To add new SPL actions:

1. Define your schema in `schemas.ts`
2. Implement your action in `splActionProvider.ts`

Note: Common wallet operations like native SOL transfers are handled by the base `WalletActionProvider`.
