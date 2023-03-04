import {
  AppContainer,
  AuthForm,
  Button,
  ProtectedRoute,
  TodoListCard,
} from '@/components'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks'

const App = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <AppContainer className='relative'>
      {isAuthenticated ? (
        <Button
          styleType='link'
          className='absolute right-3 top-4 no-underline'
          onClick={() => logout()}
        >
          Logout
        </Button>
      ) : null}

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
          path='/login'
          element={isAuthenticated ? <Navigate to='/' /> : <AuthForm />}
        />
        <Route
          path='/register'
          element={
            isAuthenticated ? (
              <Navigate to='/' />
            ) : (
              <AuthForm action='register' />
            )
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AppContainer>
  )
}

export default App
