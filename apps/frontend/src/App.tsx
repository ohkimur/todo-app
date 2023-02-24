import { useEffect } from 'react'
import {
  AppContainer,
  Auth,
  Button,
  Providers,
  TodoListCard,
} from './components'
import { useAuth } from './hooks'

const App = () => {
  const { isAuthenticated, logout } = useAuth()

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])

  return (
    <Providers>
      <AppContainer className='relative'>
        {isAuthenticated ? (
          <>
            <TodoListCard title='Todo List' />
            <Button
              styleType='link'
              className='absolute right-3 top-4 no-underline'
              onClick={() => logout()}
            >
              Logout
            </Button>
          </>
        ) : (
          <Auth />
        )}
      </AppContainer>
    </Providers>
  )
}

export default App
