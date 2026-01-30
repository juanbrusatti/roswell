"use client"

import { useStore } from "@/lib/store"
import { Header } from "@/components/header-improved"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin-dashboard"
import { MaintenancePage } from "@/components/maintenance-page"

export default function HomePage() {
  const { isAdmin } = useStore()

  if (isAdmin) {
    return <AdminDashboard />
  }

  return <MaintenancePage />
}
