"use client"

import { useStore } from "@/lib/store"
import { Header } from "@/components/header-improved"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin-dashboard"
import { MaintenancePage } from "@/components/maintenance-page"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function HomePageContent() {
  const { isAdmin } = useStore()
  const searchParams = useSearchParams()
  const viewMode = searchParams.get('view')

  // Si es admin y quiere ver la tienda como usuario
  if (isAdmin && viewMode === 'store') {
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

  if (isAdmin) {
    return <AdminDashboard />
  }

  return <MaintenancePage />
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}
