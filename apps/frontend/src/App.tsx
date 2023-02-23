import { TodoListCard } from './components'
import { AppContainer } from './components/core/AppContainer'

const App = () => {
  return (
    <AppContainer>
      <TodoListCard title='Todo List' />
      {/* <Auth /> */}
    </AppContainer>
  )
}

export default App
