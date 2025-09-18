"use client"

import { Header } from "@/components/header-improved"
import { Footer } from "@/components/footer"

interface CategoryLayoutProps {
  children: React.ReactNode
}

export function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
