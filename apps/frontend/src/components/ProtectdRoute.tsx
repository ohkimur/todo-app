import { useAuth } from '@/hooks'
import { Navigate } from 'react-router-dom'

interface IProtectedRoute {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to='/auth' replace />
  }
  return <>{children}</>
}
