"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="absolute inset-0 bg-[url('/urban-street-graffiti-wall.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
          ROSWELL
          <span className="block text-accent">URBANO</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Indumentaria urbana auténtica para la generación de la calle. Expresa tu estilo con nuestra colección curada de buzos, remeras y accesorios.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Ver Colección
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/about">Nuestra Historia</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
