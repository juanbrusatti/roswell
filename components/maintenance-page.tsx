"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Instagram } from "lucide-react"

export function MaintenancePage() {
  const { login, logout } = useStore()
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(username, password)
    if (success) {
      setLoginError("")
    } else {
      setLoginError("Credenciales incorrectas")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Título principal */}
        <h1 className="text-4xl md:text-4m font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
         Se nos fue de las manos ⚠️
        </h1>

        {/* Texto explicativo */}
        <div className="space-y-4 text-lg md:text-xl text-gray-300">
          <p>Entró tanta ropa nueva que la web quedó vieja</p>
        </div>

        {/* Información de actualización */}
        <div className="space-y-2 text-gray-400">
          <p>Estamos acomodando todo</p>
          <p>Por el momento podes ver los nuevos ingresos por IG</p>
        </div>

        {/* Botón de Instagram */}
        <a 
          href="https://instagram.com/roswell.ind" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
        >
          <Instagram className="w-5 h-5" />
          Ver en Instagram
        </a>

        {/* Agradecimiento */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-gray-400">
            Gracias la paciencia.
          </p>
          <p className="text-xl font-semibold text-white mt-2">
            Roswell ❤️
          </p>
        </div>

        {/* Acceso para administradores */}
        <div className="pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdminLogin(!showAdminLogin)}
            className="text-gray-500 hover:text-gray-300 text-xs"
          >
            Acceso administrador
          </Button>
        </div>

        {/* Formulario de login para administradores */}
        {showAdminLogin && (
          <Card className="bg-gray-900 border-gray-800 max-w-sm mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-lg">Acceso Administrador</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300 text-sm">Usuario</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 text-sm">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                {loginError && (
                  <Alert className="bg-red-900/20 border-red-800">
                    <AlertDescription className="text-red-400 text-sm">
                      {loginError}
                    </AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                  Ingresar
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
