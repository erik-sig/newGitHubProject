import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { ProfilePage } from './pages/app/profile/profile'
import { RepositoryPage } from './pages/app/repository/repository'
import { SearchPage } from './pages/app/search/search'
import { Error } from './pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <SearchPage /> },
      {
        path: '/profile/:queryUser',
        element: <ProfilePage />,
      },
      { path: '/profile/:queryUser/repo/:repoId', element: <RepositoryPage /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])
