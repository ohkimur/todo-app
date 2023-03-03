import { AppContainer, AuthForm, TodoListCard } from '@/components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <TodoListCard title='Todo List' /> },
  { path: '/login', element: <AuthForm /> },
  { path: '/register', element: <AuthForm /> },
])

const App = () => {
  return (
    <AppContainer className='relative'>
      <RouterProvider router={router} />
    </AppContainer>
  )
}

export default App
