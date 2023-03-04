import { AppContainer, AuthForm, TodoListCard } from '@/components'
import { useAuth } from '@/hooks'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <AppContainer className='relative'>
      <Routes>
        <Route path='/' element={<TodoListCard title='Todo List' />} />
        {!isAuthenticated ? (
          <>
            <Route path='/login' element={<AuthForm />} />
            <Route path='/register' element={<AuthForm />} />
          </>
        ) : null}
      </Routes>
    </AppContainer>
  )
}

export default App
