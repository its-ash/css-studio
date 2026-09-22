/** Base64url encode/decode helpers for share URLs. */

function bytesToB64(bytes: Uint8Array): string {
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function encodeState(obj: unknown): string {
  try {
    const json = JSON.stringify(obj)
    return bytesToB64(new TextEncoder().encode(json))
  } catch {
    return ''
  }
}

export function decodeState<T>(code: string): T | null {
  try {
    const b64 = code.replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4))
    const bin = atob(b64 + pad)
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    return JSON.parse(new TextDecoder().decode(bytes)) as T
  } catch {
    return null
  }
}