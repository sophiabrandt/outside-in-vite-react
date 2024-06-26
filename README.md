# outside-in-vite-react

outside-in-vite-react is a sample project for experimenting with vitest and playwright.

_Note_: this project is from the book [Outside-In React Development](https://outsidein.dev/) with some replacements made by me:

- TypeScript
- [vite](https://vitejs.dev) & [vitest](https://vitest.dev)
- [Playwright](https://playwright.dev) instead of Cypress
- [MobX](https://mobx.js.org) instead of Redux
- plain fetch instead of axios
- uncontrolled form components

## Installation

- Node.js
- [bun](https://bun.sh)

Install dependencies:

```sh
bun install
```

You will need an API key for the backend server. Check [https://api.outsidein.dev/](https://api.outsidein.dev/) for further information.

Create a new file called `.env.local` and add the key:

```
VITE_API_KEY=
```

## Usage

```bash
bun start
```

## Tests

```bash
bun run test
bun run test:e2e # before the first run you will need to do: `bunx playwright install`
```
