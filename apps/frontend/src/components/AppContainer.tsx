import { Card, Checkbox } from '.'

export const AppContainer = () => {
  return (
    <div className='bg-light-grey min-h-screen flex items-center justify-center'>
      <Card footer={<p>Ola</p>}>
        <ul className='list-none flex flex-col'>
          <li className='flex gap-3.5'>
            <Checkbox label='Item 1' id='check' />
            Item 1
          </li>

          <li className='flex gap-3.5'>
            <Checkbox label='Item 1' id='check3' />
            Item 1
          </li>
          <li className='flex gap-3.5'>
            <Checkbox label='Item 1' id='check4' />
            Item 1
          </li>
        </ul>
      </Card>
    </div>
  )
}
