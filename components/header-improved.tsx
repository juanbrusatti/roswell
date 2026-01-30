"use client"

import { Suspense, memo } from "react"
import { HeaderContent } from "./header-content"

const Header = memo(function Header() {
  return (
    <Suspense fallback={<div className="h-16 bg-background/95 backdrop-blur border-b" />}>
      <HeaderContent />
    </Suspense>
  )
})

export { Header }
