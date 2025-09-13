export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ROSWELL</h3>
            <p className="text-sm opacity-80">
              Indumentaria urbana auténtica para la generación de la calle. Expresa tu estilo único.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Comprar</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/category/hoodies" className="hover:opacity-100 transition-opacity">
                  Buzos
                </a>
              </li>
              <li>
                <a href="/category/tshirts" className="hover:opacity-100 transition-opacity">
                  Remeras
                </a>
              </li>
              <li>
                <a href="/category/pants" className="hover:opacity-100 transition-opacity">
                  Pantalones
                </a>
              </li>
              <li>
                <a href="/category/accessories" className="hover:opacity-100 transition-opacity">
                  Accesorios
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Soporte</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/contact" className="hover:opacity-100 transition-opacity">
                  Contactanos
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:opacity-100 transition-opacity">
                  Envíos
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:opacity-100 transition-opacity">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="/size-guide" className="hover:opacity-100 transition-opacity">
                  Guía de Talles
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Seguinos</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 ROSWELL. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
