import { createContext, useContext, useState } from 'react'

/** Which chip (potato / banana / tapioca) the products and life-cycle sections are showing. */
const Ctx = createContext(null)

export function ChipTypeProvider({ children }) {
  const [type, setType] = useState('potato')
  return <Ctx.Provider value={{ type, setType }}>{children}</Ctx.Provider>
}

export const useChipType = () => useContext(Ctx)
