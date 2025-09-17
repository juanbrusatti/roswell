export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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
                <a href="/category/hoodies" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Buzos
                </a>
              </li>
              <li>
                <a href="/category/tshirts" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Remeras
                </a>
              </li>
              <li>
                <a href="/category/pants" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Pantalones
                </a>
              </li>
              <li>
                <a href="/category/accessories" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Accesorios
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Soporte</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/contact" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Contactanos
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Envíos
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="/size-guide" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Guía de Talles
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Seguinos</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="https://www.instagram.com/roswell.ind/" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@roswell.ind" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-all duration-300 hover:translate-x-1 block">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Nueva sección de Dlay */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-4 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg border border-slate-500/20">
              <h4 className="font-semibold text-slate-200 mb-2 text-center text-sm">
                Desarrollado por
              </h4>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2 relative">
                  <span className="inline-block animate-bounce" style={{animationDelay: '0.1s'}}>D</span>
                  <span className="inline-block animate-bounce" style={{animationDelay: '0.2s'}}>L</span>
                  <span className="inline-block animate-bounce" style={{animationDelay: '0.3s'}}>A</span>
                  <span className="inline-block animate-bounce" style={{animationDelay: '0.4s'}}>Y</span>
                </h3>
                <p className="text-xs text-slate-300 mb-3">
                  Soluciones digitales innovadoras
                </p>
                <a 
                  href="https://dlay.com.ar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-slate-700 px-4 py-2 rounded-full font-medium text-sm hover:bg-slate-50 transition-all duration-300 hover:shadow-md hover:-translate-y-1 transform hover:scale-105"
                >
                  Visitar dlay.com.ar
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 ROSWELL. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs opacity-60">
            Sitio web desarrollado por{' '}
            <a 
              href="https://dlay.com.ar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-100 transition-colors duration-300 underline hover:no-underline"
            >
              Dlay
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
