export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">STREET</h3>
            <p className="text-sm opacity-80">
              Authentic streetwear for the urban generation. Express your unique style.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/category/hoodies" className="hover:opacity-100 transition-opacity">
                  Hoodies
                </a>
              </li>
              <li>
                <a href="/category/tshirts" className="hover:opacity-100 transition-opacity">
                  T-Shirts
                </a>
              </li>
              <li>
                <a href="/category/pants" className="hover:opacity-100 transition-opacity">
                  Pants
                </a>
              </li>
              <li>
                <a href="/category/accessories" className="hover:opacity-100 transition-opacity">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/contact" className="hover:opacity-100 transition-opacity">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:opacity-100 transition-opacity">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:opacity-100 transition-opacity">
                  Returns
                </a>
              </li>
              <li>
                <a href="/size-guide" className="hover:opacity-100 transition-opacity">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
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
          <p>&copy; 2024 STREET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
