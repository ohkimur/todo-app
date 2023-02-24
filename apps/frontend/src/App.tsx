import { useEffect } from 'react'
import { AppContainer, Auth, Providers, TodoListCard } from './components'
import { useAuth } from './hooks'

const App = () => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])

  return (
    <Providers>
      <AppContainer>
        {isAuthenticated ? <TodoListCard title='Todo List' /> : <Auth />}
      </AppContainer>
    </Providers>
  )
}

export default App
