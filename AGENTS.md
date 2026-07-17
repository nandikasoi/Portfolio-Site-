AGENTS: Repo setup, troubleshooting, and developer notes

Purpose
- Document work performed by the coding agent while scaffolding the minimal portfolio site for NANDIKA SOI.
- Capture troubleshooting steps (TypeScript/PowerShell/npm) so future contributors know what happened and how to reproduce or fix it.

What I created
- Project root files:
  - `package.json` — scripts and dependencies for Astro + Tailwind + sitemap
  - `astro.config.mjs` — Astro config with Tailwind and sitemap integrations
  - `tailwind.config.mjs` — Tailwind config and custom colors/fonts
  - `tsconfig.json` — extends `astro/tsconfigs/strict`
  - `README.md` — setup and deploy instructions
  - `AGENTS.md` — this file (notes and troubleshooting)

- Source files (under `src/`):
  - `src/pages/index.astro` — Home page (placeholder content)
  - `src/pages/about.astro` — About page (placeholder content)
  - `src/pages/projects.astro` — Projects page (placeholder content)
  - `src/components/Header.astro` — site header and navigation
  - `src/components/Footer.astro` — site footer (dynamic year)
  - `src/components/NewsletterForm.astro` — email capture form (frontend only)
  - `src/components/ProjectCard.astro` — project preview cards
  - `src/styles/globals.css` — Tailwind directives and global rules

- Public assets (under `public/`):
  - `favicon.svg`
  - `robots.txt`

What I ran/verified
- Confirmed `node` and `npm` installed (example from environment: `node v24.13.0`, `npm 11.6.2`).
- Installed dependencies using `npm install` (completed successfully in the workspace).
- Built the site with `npm run build` to verify compilation.
- Started the dev server (used Command Prompt to avoid a PowerShell execution policy block) and verified pages served: `/`, `/about`, `/projects`.

Observed issues and root cause
- `tsconfig.json` showed an error in the editor because it contains:
  ```json
  { "extends": "astro/tsconfigs/strict" }
  ```
  The file itself is valid. The error arises when VS Code's TypeScript server cannot resolve the module path to `astro/tsconfigs/strict` (it resolves through `node_modules`). This generally happens if `node_modules` is missing or the TS server started before dependencies were installed.
- PowerShell execution policy blocked running `npm` scripts from the integrated terminal (error: `npm.ps1 cannot be loaded because running scripts is disabled on this system`). This is a local PowerShell policy, not an npm/Node problem.

How to fix the `tsconfig.json` problem (editor error)
1. Ensure dependencies are installed from the project root:
   ```bash
   npm install
   ```
2. Restart the TypeScript server in VS Code:
   - Command Palette → `TypeScript: Restart TS Server`
3. If still present, reload the window:
   - Command Palette → `Developer: Reload Window`
4. Ensure workspace TypeScript is used:
   - Command Palette → `TypeScript: Select TypeScript Version` → `Use Workspace Version`
5. Temporary bypass (not recommended long-term): replace `tsconfig.json` with a minimal config while editing:
   ```json
   { "compilerOptions": {} }
   ```

PowerShell `npm` script workaround and options
- Quick workaround (no policy change): open Command Prompt (cmd.exe) and run:
  ```bash
  cd "C:\Users\PC\Desktop\VIBE-PORTFOLIO-SITE"
  npm run dev
  ```
- To allow npm scripts in PowerShell for your user (no admin required): run in PowerShell once:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser -Force
  npm run dev
  # When finished, optionally revert:
  Set-ExecutionPolicy -ExecutionPolicy Restricted -Scope CurrentUser -Force
  ```
- To avoid changing policies, change VS Code's integrated terminal default to Command Prompt: Command Palette → `Terminal: Select Default Profile` → choose `Command Prompt`.

Notes on security
- `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass` affects only the current user account and is commonly used for development, but you may revert it with `Restricted` when finished.

Deployment
- The site is configured to build to `dist/` and is ready for Cloudflare Pages.
- Build command: `npm run build`
- Publish directory: `dist`
- See `README.md` for short deployment steps.

Suggestions and next steps
- Initialize a git repo if you want version control:
  ```bash
  git init
  git add .
  git commit -m "Initial scaffold — placeholder content"
  ```
- Replace placeholder text and images in `src/pages` and `src/components` with real content.
- Hook up a mailing/list provider to the newsletter form (current form is frontend-only).

Todo status (from agent session)
- Allow running npm scripts in PowerShell: investigated (PowerShell policy identified)
- Run `npm run dev` from Command Prompt: used as a workaround and dev server started
- Enable PowerShell script execution for current user: left as an optional step (not performed by agent)
- Verify `npm run dev` starts Astro dev server: completed

If you want, I can add the exact VS Code `settings.json` snippets to set the default terminal to Command Prompt and to use the workspace TypeScript version automatically. Ask and I will add them to this file or create `.vscode/settings.json`.

-- AGENT
