# Codestyle

You're working on a fullstack web application using:

- Frontend: Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- Backend: Express.js + TypeScript (running separately on port 3000)

## Coding Guidelines

- Use **TypeScript** for all files (`.ts` / `.tsx`).
- Follow **React best practices** (function components, hooks, proper key usage).
- Use **clean and minimal code**: no unnecessary wrappers, functions, or comments.
- Use **async/await** for all asynchronous code.
- Backend and frontend are in separate folders: `/server` and `/client`.

## Frontend (Vite)

- Use Tailwind CSS for all layout and styling.
- Use `shadcn/ui` components (like Button, Card, Input, AlertDialog).
- `shadcn/ui` uses `radix-ui` as a base for components
- Components live in `client/src/components/`.
- API calls go through `fetch('/api/...')`.
- Create reusable, atomic components.
- Add types for props and API responses.

## Backend (Express)

- All code lives in `server/`.
- Create routes under `server/routes/`.
- Use `express.Router()` and export default router modules.
- Enable CORS and JSON body parsing.
- Use type-safe request/response (e.g., `Request<Params, ResBody, ReqBody>`).
- Organize middleware and routes clearly.

## Example Requests

- Generate a simple Express route in TypeScript that returns a list of tasks.
- Create a React component called `<TaskList />` that fetches and displays tasks.
- Build a shadcn `Button` that triggers a fetch call to start a task.
- Style a layout using Tailwind grid and flex utilities.

## Do

- Use `useEffect` and `useState` when fetching data.
- Add types/interfaces for components and APIs.
- Import shadcn components properly.
- Keep UI minimal and functional.

## Don't

- Don’t use class components.
- Don’t generate unused variables or extra boilerplate.
- Don’t use inline styles unless absolutely necessary.
- Don't use other old solutions. Prioritize a newest ones.
