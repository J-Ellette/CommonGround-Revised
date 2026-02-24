import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { AuthCallback } from './pages/AuthCallback'
import { Profile } from './pages/Profile'
import { Roadmap } from './pages/Roadmap'
import { ProtectedRoute } from './components/ProtectedRoute'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/auth/callback', element: <AuthCallback /> },
  { path: '/roadmap', element: <Roadmap /> },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
