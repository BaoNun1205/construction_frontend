'use client'

import React, { createContext, useContext, useState, useMemo } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbContextType {
  customTitle: string | null
  setCustomTitle: (title: string | null) => void
  customItems: BreadcrumbItem[] | null
  setCustomItems: (items: BreadcrumbItem[] | null) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined)

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [customTitle, setCustomTitle] = useState<string | null>(null)
  const [customItems, setCustomItems] = useState<BreadcrumbItem[] | null>(null)

  const value = useMemo(
    () => ({
      customTitle,
      setCustomTitle,
      customItems,
      setCustomItems
    }),
    [customTitle, customItems]
  )

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    return {
      customTitle: null,
      setCustomTitle: () => {},
      customItems: null,
      setCustomItems: () => {}
    }
  }
  return context
}
