# Sri Gopal Group — websites

Two separate React + Vite projects:

| Folder | What | Dev URL |
| --- | --- | --- |
| `sgf-landing` | Sri Gopal Group landing page (Transports, Farms, Investments, Foods, Real Estates) | http://localhost:5173 |
| `sgf-food` | Sri Gopal Foods website (separate project) | http://localhost:5174 |

Company details live in `sgf-landing/src/data/businesses.js` and `sgf-food/src/data/menu.js`.

Stack: React 19, Vite, [Motion](https://motion.dev) (Framer Motion) for animations, [Lenis](https://lenis.darkroom.engineering) for smooth scrolling.

## Run

```bash
npm install      # once, from this folder (installs both projects)
npm run dev      # starts both sites together
npm run build    # production build → sgf-landing/dist and sgf-food/dist
```

## Linking the two sites

The sites link to each other through environment variables:

- `sgf-landing/.env` → `VITE_FOOD_URL` (where the Food nav link goes)
- `sgf-food/.env` → `VITE_GROUP_URL` (where "Back to SGF Group" goes)

When deploying, set these to the real domains (for example `https://sgfgroup.in` and `https://food.sgfgroup.in`) before building.

## Adding the next business site

1. Copy `sgf-food` as a starting point (e.g. `sgf-transport`) and add it to `workspaces` in the root `package.json`.
2. Give it its own port in `vite.config.js`.
3. In `sgf-landing/src/data/businesses.js`, add a `url` to that business — the navbar, cards and panels will then open it with the page transition and show a "Live website" badge.
