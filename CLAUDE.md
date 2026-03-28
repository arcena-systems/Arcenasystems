# CLAUDE.md — Arcena Systems Website

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Project Structure & Git Workflow

### Folder layout
```
~/Desktop/Website/
├── main/                ← branch: main (stable version, never edit directly)
└── <feature-name>/      ← worktree branches (temporary, created per feature)
```

### Starting a new feature
```bash
cd ~/Desktop/Website/main
git worktree add ../<feature-name> -b feature/<feature-name>
```
Then work exclusively in `~/Desktop/Website/<feature-name>/`.

### Finishing a feature
1. Commit and push from the worktree folder
2. Merge into main (via GitHub PR or `git merge`)
3. Clean up:
```bash
cd ~/Desktop/Website/main
git pull
git worktree remove ../<feature-name>
git branch -d feature/<feature-name>
```

### Rules
- **Never commit directly to `main`** — always use a feature branch + worktree
- **Worktree folders live next to `main/`** inside `~/Desktop/Website/`
- **Name convention**: folder = feature name, branch = `feature/<feature-name>`
- **One feature per worktree** — create multiple worktrees for parallel work
- After merging, always delete the worktree and branch to keep things clean

### GitHub
- Repo: `arcena-systems/Arcenasystems`
- Use `gh` CLI (at `/opt/homebrew/bin/gh`) for PRs
- PATH note: run `export PATH="/opt/homebrew/bin:$PATH"` if `gh`/`npm` aren't found

### CSS Build
- Source: `src/input.css` (Tailwind v4 + self-hosted fonts)
- Output: `styles.css` (committed, needed for the site to work)
- Build: `npm run build:css`
- Watch: `npm run dev:css`
- **Rebuild `styles.css` after any class changes** before committing

## Iteration Only (Project already exists)
- This project already has an `index.html`. **Do not rebuild the site from scratch.**
- Your job is to **iterate, fix, and improve the existing website** based on my instructions and any reference screenshots I provide.
- Prefer **small, targeted changes** over refactors or rewrites.
- Do **not** add new sections/features unless I explicitly ask.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, animations, and color as closely as possible.
- Use the existing `index.html` as source of truth for content; do not invent new content unless asked.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- If the server is already running, do not start a second instance.

## Screenshot Workflow (Puppeteer)
- Use the project’s Puppeteer screenshot tool (Puppeteer is installed in `node_modules/`).
- Chrome cache is at `/Users/danihalabi/.cache/puppeteer/`.
- **Always screenshot from localhost using Puppeteer:**
  - `node screenshot.mjs http://localhost:3000`
- Screenshots are saved to `./temporary screenshots/screenshot-N.png` (auto-incremented).
- Optional label: `node screenshot.mjs http://localhost:3000 label` → `screenshot-N-label.png`
- Use screenshots to review changes when I ask for visual improvements.

## Brand Assets
- Always check the `brand_assets/` folder before adjusting visuals.
- Use existing logos/colors/assets from there if present (do not replace with placeholders unless asked).

## Hard Rules
- Do not stop after one iteration if I ask to “make it better” — do at least one review pass.
- Only animate `transform` and `opacity`. Never `transition-all`.
- Keep changes aligned with the current website style unless I request a redesign.
