# wStocks – Frontend

Web interface (DApp) for the **wStocks** ecosystem. This repository contains the **frontend** code that connects to the `wstocks-anchor-template` Anchor program to register Real World Assets (RWA) and manage their SPL tokens on the Solana network.

## Intro

Functionally, wStocks allows users to create and visualize tokens representing real-world stocks on Solana, consuming on-chain *asset registry* data exposed by the Anchor program. From this app, the user can register a new asset, mint additional supply of the associated token, and explore the status of tokenized assets.

* GitHub Repository (frontend): [https://github.com/victoraranguren/wstocks-frontend-template](https://github.com/victoraranguren/wstocks-frontend-template)
* Anchor Program (on-chain backend): [https://github.com/victoraranguren/wstocks-anchor-template](https://github.com/victoraranguren/wstocks-anchor-template)

## Tech Stack

This repository contains the **frontend** source code. Main technologies:

* **Next.js** (App Router)
* **TypeScript**
* **TailwindCSS** & **shadcn/ui**
* **Framework kit**: Solana Kit and Solana Web3.js
* **TanStack Query** for remote data management and caching

## Prerequisites

* Node.js >= 18
* pnpm / npm / yarn installed (the project typically uses pnpm if configured in `package.json`)
* A **Helius** API key to connect to the Solana network

## Installation

1. Clone the repository:
```bash
git clone https://github.com/victoraranguren/wstocks-frontend-template.git
cd wstocks-frontend-template

```


2. Install dependencies (example with pnpm):
```bash
pnpm install

```



## Environment Variables

Create a `.env.local` file in the project root (or use your preferred environment variable mechanism) and define:

```bash
NEXT_PUBLIC_API=<helius-api-key>

```

* `NEXT_PUBLIC_API`: Helius API key used for requests related to the Solana network.

## Common Scripts

Depending on how `package.json` is configured, typical commands will be:

* **Development**:
```bash
pnpm dev

```


* **Production Build**:
```bash
pnpm build

```


* **Production Preview**:
```bash
pnpm start

```



(Adjust `pnpm` to `npm` or `yarn` if using another package manager.)

## Project Architecture

The application is organized into clear layers to separate UI, data logic, and Solana connection:

* `app/`
* `layout.tsx`: Next.js root layout. Configures fonts, metadata, and wraps the entire app with global *providers*:
* `QueryProvider` (React Query) for on-chain data *fetching* and caching.
* `Provider` from `solana/provider` which creates the Solana client (Devnet) and exposes the wallet context to the entire UI.
* `Toaster` for notifications (`sonner`).


* `page.tsx`: Main page. Orchestrates the user experience:
* Uses TanStack Query's `useQuery` to periodically read the *asset registry* state and tokens from the RWA program on Solana.
* Passes resulting data to presentation components (`AssetRegistryCard`, `TokenMetadataCard`, etc.).




* `components/`
* `header.tsx`: Fixed header with basic navigation and the wallet connection button.
* `connect-button-wallet.tsx`: Component that shows wallet status (connected/disconnected) and allows selecting Phantom/Solflare/Backpack using `@solana/react-hooks`.
* `create-asset-form.tsx`: Main form to register a new asset:
* Manages form state and validation (asset + SPL token).
* Builds and sends the `initializeAsset` instruction to the RWA program on Solana.
* Uses `useSendTransaction` and `useWalletConnection` to sign and send the transaction, and invalidates the React Query `assets` query upon success.


* `asset-registry-card.tsx`: Displays information for each asset registry (ISIN, authority, type, date, legal docs) and allows closing/deleting the registry via an on-chain instruction.
* `token-metadata-card.tsx`: Displays metadata of the associated SPL token (mint, supply, authority, programId) and exposes an action to increase *supply* via a transaction to the same program.
* `theme-provider.tsx`: Small wrapper over `next-themes` for theme management.
* `ui/`: Collection of reusable design components (buttons, cards, inputs, selects, badges, toasts) generated with shadcn/ui and styled with Tailwind.


* `solana/provider/`
* `provider.tsx`: Defines the high-level `SolanaProvider` and configures the Solana client pointing to Devnet, enabling wallet auto-detection in the browser. Any component using `@solana/react-hooks` relies on this provider.


* `tanstack-query/components/`
* `provider.tsx`: Initializes a unique `QueryClient` per session and exposes it via `QueryClientProvider` so `useQuery` and other hooks work throughout the app.


* `lib/`
* `utils.ts`: UI utilities like `cn` to safely combine Tailwind classes.


* `styles/` and `app/globals.css`
* Global style configuration, color tokens, and general visual adjustments for the app.



## Contributing

1. Create a branch from `dev`.
2. Implement your changes.
3. Open a Pull Request describing the change made.

## License

Pending definition or update according to project needs.
