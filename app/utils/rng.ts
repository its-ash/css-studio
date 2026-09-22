/** Simple deterministic seeded RNG (mulberry32) returning [0,1). */
export interface Rng {
  (): number
  int(min: number, max: number): number
  pick<T>(arr: readonly T[]): T
  range(min: number, max: number): number
  chance(p: number): boolean
}

export function makeRng(seed: number): Rng {
  let t = seed >>> 0
  const next = () => {
    t += 0x6d2b79f5
    let r = t
    r = Math.imul(r ^ (r >>> 15), r | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
  const fn = next as Rng
  fn.int = (min: number, max: number) => Math.floor(next() * (max - min + 1)) + min
  fn.range = (min: number, max: number) => next() * (max - min) + min
  fn.pick = <T>(arr: readonly T[]) => arr[Math.floor(next() * arr.length)] as T
  fn.chance = (p: number) => next() < p
  return fn
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 0xfffffff)
}

export function seedLabel(seed: number): string {
  return seed.toString(36)
}