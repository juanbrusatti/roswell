"use client"

import { useStore } from "@/lib/store"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function HomePage() {
  const { isAdmin } = useStore()

  if (isAdmin) {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
