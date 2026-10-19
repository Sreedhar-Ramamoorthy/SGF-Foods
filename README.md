# Sri Gopal Group — Websites

This repo has two websites:

| Folder | Website | Local URL |
| --- | --- | --- |
| `sgf-landing/` | **Sri Gopal Group** landing page (Transports, Farms, Investments, Foods, Real Estates) | http://localhost:5173 |
| `sgf-food/` | **Sri Gopal Foods** food-ordering site | http://localhost:5174 |

Clicking **Foods** on the landing page opens the Foods site, and Foods has a "Back to Sri Gopal Group" button. **Run both sites together** so these links work.

Built with React 19, Vite, [Motion](https://motion.dev) for animations and [Lenis](https://lenis.darkroom.engineering) for smooth scrolling.

---

## 1. First-time setup (once per computer)

**Step 1 — Install Node.js.** Install the **LTS** version from https://nodejs.org (version 20.19 or newer, or 22.12 or newer).
On Windows you can also run this command:

```bash
winget install --id OpenJS.NodeJS.LTS -e
```

Close and reopen your terminal, then check that it worked:

```bash
node -v     # should print v20.19+ or v22.12+
```

**Step 2 — Get the code.**

```bash
git clone https://github.com/Sreedhar-Ramamoorthy/SGF-Foods.git
cd SGF-Foods
```

**Step 3 — Install packages.** Run this once in the `SGF-Foods` folder. It sets up both sites.

```bash
npm install
```

## 2. Run the sites (every day)

From the `SGF-Foods` folder:

```bash
npm run dev
```

Wait until you see both `localhost:5173` and `localhost:5174` in the terminal, then open:

- Group landing page → http://localhost:5173
- Sri Gopal Foods → http://localhost:5174

Code changes show up in the browser automatically when you save. To stop the sites, press **Ctrl + C** in the terminal.

To run only one site:

```bash
npm run dev:landing    # only the landing page
npm run dev:food       # only the Foods site
```

## 3. Get the latest code

```bash
git pull
npm install       # only needed if package.json changed, but safe to run anytime
npm run dev
```

## 4. Where to change things

| To change… | Edit this file |
| --- | --- |
| Group name, address, business list, colours, taglines | `sgf-landing/src/data/businesses.js` |
| "About" text and the numbers (stats) | `sgf-landing/src/components/About.jsx` |
| Foods company name and address, menu, prices, combos, reviews | `sgf-food/src/data/menu.js` |
| Page titles shown in the browser tab | `index.html` inside each folder |
| Styles | `src/styles/global.css` inside each folder |

> ⚠️ The Foods menu, prices, combos and reviews, and the landing page stats (years, team size, customers), are **sample content**. Replace them with the client's real details before going live.

## 5. Build for production

```bash
npm run build
```

The finished sites are in `sgf-landing/dist/` and `sgf-food/dist/`. Upload each folder to its hosting.

**Before you build for production**, set the real website addresses. The sites use these to link to each other:

- `sgf-landing/.env` → `VITE_FOOD_URL` (where the Foods link goes), e.g. `https://food.sgfgroup.in`
- `sgf-food/.env` → `VITE_GROUP_URL` (where "Back to Sri Gopal Group" goes), e.g. `https://sgfgroup.in`

The default values point to localhost, which is correct for local development.

## 6. Common problems

| Problem | Fix |
| --- | --- |
| `'npm' is not recognized` / `node: command not found` | Node.js isn't installed, or the terminal was open during the install. Install it (step 1), then close and reopen the terminal. |
| `Port 5173 is already in use` (or 5174) | The sites are already running in another terminal. Use that one, or press Ctrl + C there first. If no terminal is running them, restart your computer or end the `node` processes in Task Manager. |
| Clicking **Foods** shows "This site can't be reached" | Only the landing page is running. Use `npm run dev` (not `dev:landing`) so both sites run. |
| Errors after `git pull` | Run `npm install` again. |
| Something is still broken | Delete the `node_modules` folder and run `npm install` again. |

## Adding another business website (for developers)

1. Copy `sgf-food` to a new folder (e.g. `sgf-transport`) and change `"name"` in its `package.json`.
2. Give it a new port (e.g. 5175) in its `vite.config.js`.
3. Add the folder to `workspaces` and to the `dev` and `build` scripts in the root `package.json`.
4. Add `url: import.meta.env.VITE_TRANSPORT_URL` to that business in `sgf-landing/src/data/businesses.js`, and add `VITE_TRANSPORT_URL` to `sgf-landing/.env`. The navbar, cards and panels will then open it with the page transition and show a "Live website" badge.
