import {
  AppContainer,
  AuthForm,
  ProtectedRoute,
  TodoListCard,
} from '@/components'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks'

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <AppContainer className='relative'>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <TodoListCard title='Todo List' />
            </ProtectedRoute>
          }
        />

        <Route
          path='/auth'
          element={isAuthenticated ? <Navigate to='/' /> : <AuthForm />}
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AppContainer>
  )
}

export default App
