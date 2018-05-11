declare module 'ethereum-blockies-png' {
  export function createBuffer (opts: { seed: string; scale?: number }): Buffer

  export function createDataURL (opts: {
    seed: string
    scale?: number
  }): string
}
