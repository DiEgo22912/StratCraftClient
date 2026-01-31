# StratCraftClient

This repository holds client builds for StratCraft.

Usage:

1. Assemble a client locally from a Minecraft installation (example):

   node assemble-from-local.js "C:\Users\you\AppData\Roaming\.minecraft" "forge-1.20.1-47.4.16"

   This will create `dist/StratCraftClient-<version>.zip` and `dist/client-manifest.json`.

2. Commit the `dist/` files and push to this repository.

3. In GitHub Actions -> **Publish client release** workflow, run the workflow and provide the `version` (for example `client-1.0.0` or the exact version string).

The workflow will:
- compute/verify `sha512` and `size`,
- set `archive.url` in `client-manifest.json` to the release download URL,
- create a GitHub Release with tag = provided `version`,
- upload the ZIP and `client-manifest.json` as release assets.

Notes:
- The workflow expects a prepared `dist/` directory with the ZIP and `client-manifest.json`. If you want the workflow to build from a `.minecraft` path, use a self-hosted runner with your files present.
- Release tags should follow your desired pattern (the convention `client-1.0.0` is recommended).