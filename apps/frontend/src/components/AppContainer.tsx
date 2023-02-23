import { Card } from '.'

export const AppContainer = () => {
  return (
    <div className='bg-light-grey min-h-screen flex items-center justify-center'>
      <Card footer={<p>Ola</p>}>Ola seniora!</Card>
    </div>
  )
}
