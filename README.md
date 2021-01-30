# Math Break

:nerd_face: Take a break and do some maths! :nerd_face:

# Development

## Running the application

Clone the repository:

```bash
git clone https://github.com/JonShort/math-break.git
```

Install dependencies

```bash
npm install
```

Run the app:

```bash
npm run start
```

Run in debug mode:

```bash
npm run debug
```

## Architecture

- The render process should not have access to any node processes
  - `nodeIntegration` will ideally remain `false`
  - `contextIsolation` will ideally remain `true`
- Methods should be shared with the render process via. the preload script
  - e.g. global `gameMethods` object allows the render process general 'game' related actions
- IPC messages should be used for any inter-process communcication, e.g. triggering a node-related process on main
  - e.g. sending a `gameOver` message to main, so scores can be stored
