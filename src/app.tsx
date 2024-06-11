import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { router } from './routes'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-github-react-theme">
        <Helmet titleTemplate="%s | GitHubFinder" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster richColors position="bottom-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
