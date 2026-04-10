declare module 'async_hooks' {
  export * from 'node:async_hooks'
}

declare module 'node:async_hooks' {
  export class AsyncLocalStorage<T = unknown> {
    disable(): void
    getStore(): T | undefined
    run<R>(store: T, callback: () => R): R
  }
}
