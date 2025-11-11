// Ambient module declarations to satisfy imports of the React JSX runtime
// when using Preact compat in a Deno/Fresh project.
//
// These declarations tell TypeScript that `react/jsx-runtime` and
// `react/jsx-dev-runtime` should resolve to Preact's `jsx-runtime`,
// matching the import map in `deno.json`.
declare module 'react/jsx-runtime' {
  export * from 'preact/jsx-runtime';
}

declare module 'react/jsx-dev-runtime' {
  export * from 'preact/jsx-runtime';
}
