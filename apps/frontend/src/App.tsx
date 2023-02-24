import { AppContainer, Providers, TodoListCard } from './components'

const App = () => {
  return (
    <Providers>
      <AppContainer>
        <TodoListCard title='Todo List' />
        {/* <Auth /> */}
      </AppContainer>
    </Providers>
  )
}

export default App
