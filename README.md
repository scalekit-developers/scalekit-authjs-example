# Scalekit + Auth.js Example (Next.js)

A minimal Next.js application demonstrating enterprise SSO via [Scalekit](https://scalekit.com) using [Auth.js](https://authjs.dev) (next-auth v5).

Scalekit provides auth and actions on behalf of users, with 500+ connectors and 20,000+ tools.

## Prerequisites

- A [Scalekit](https://scalekit.com) account and environment
- Node.js 18+ and [pnpm](https://pnpm.io)

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/scalekit-developers/scalekit-authjs-example.git
cd scalekit-authjs-example
pnpm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in `.env.local` with your Scalekit credentials (see step 3).

### 3. Configure Scalekit

In your [Scalekit dashboard](https://app.scalekit.com):

1. **Get credentials** — Go to **API Keys** and copy your:
   - Environment URL → `AUTH_SCALEKIT_ISSUER` (e.g. `https://yourenv.scalekit.dev`)
   - Client ID → `AUTH_SCALEKIT_ID` (starts with `skc_`)
   - Client Secret → `AUTH_SCALEKIT_SECRET`

2. **Register redirect URI** — Add the following to your allowed redirect URIs:
   ```
   http://localhost:3000/auth/callback/scalekit
   ```

3. **Get a Connection ID** *(optional)* — To route sign-in to a specific SSO connection:
   Go to **Organizations → [your org] → Connections** and copy the connection ID (`conn_...`) → `AUTH_SCALEKIT_CONNECTION_ID`

### 4. Run the app

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) and click **Sign in**.

## How it works

- `auth.ts` — NextAuth config with the Scalekit OIDC provider
- `providers/scalekit.ts` — Local copy of the Scalekit provider (see note below)
- Auth routes are served at `/auth/*` (basePath is `/auth`, not `/api/auth`)

> **Note: Local provider copy**
>
> This example includes `providers/scalekit.ts` as a local copy of the Scalekit provider,
> mirroring the implementation in [nextauthjs/next-auth#13392](https://github.com/nextauthjs/next-auth/pull/13392).
> Once that PR is merged and released, the provider will be available natively in `next-auth`.
> At that point:
> 1. Delete `providers/scalekit.ts`
> 2. In `auth.ts`, replace:
>    ```ts
>    import Scalekit from "./providers/scalekit"
>    ```
>    with:
>    ```ts
>    import Scalekit from "next-auth/providers/scalekit"
>    ```

## License

ISC
