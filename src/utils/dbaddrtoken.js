import OrbitDB from "orbit-db";

export const decodeToken = (token) => {
  try {
    const addr = atob(token)
    if (!OrbitDB.isValidAddress(addr)) return false
    return addr
  } catch (error) {
    return false
  }
}

export const encodeToken = (addr) => {
  return btoa(addr)
}