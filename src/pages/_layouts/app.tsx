import { ArrowLeft } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'

export function AppLayout() {
  const { pathname } = useLocation()

  return (
    <main className="min-h-screen antialiased relative">
      {pathname.includes('/repo') ? (
        <Button
          className="bg-transparent absolute top-10 left-10 flex gap-2 text-foreground text-2xl items-center font-semibold hover:bg-transparent hover:underline"
          onClick={() => window.history.back()}
        >
          <ArrowLeft /> Voltar
        </Button>
      ) : (
        <Link
          to="/"
          className="bg-transparent absolute top-10 left-10 flex gap-2 text-foreground text-2xl items-center font-semibold hover:bg-transparent hover:underline"
        >
          <ArrowLeft /> Voltar
        </Link>
      )}
      <div className="absolute top-10 right-10">
        <ThemeToggle />
      </div>

      <Outlet />
    </main>
  )
}
