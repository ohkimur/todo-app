import { AppContainer, Auth, Providers } from './components'
const App = () => {
  return (
    <Providers>
      <AppContainer className='relative'>
        {/* TODO: Add router here */}
        {/* <>
          <TodoListCard title='Todo List' />
          <Button
            styleType='link'
            className='absolute right-3 top-4 no-underline'
          >
            Logout
          </Button>
        </> */}
        <Auth />
      </AppContainer>
    </Providers>
  )
}

export default App
