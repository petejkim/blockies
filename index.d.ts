declare module 'ethereum-blockies-png' {
  declare function createBuffer (opts: { seed: string; scale?: number }): Buffer

  declare function createDataURL (opts: {
    seed: string
    scale?: number
  }): string

  module.exports = {
    createBuffer,
    createDataURL
  }
}
