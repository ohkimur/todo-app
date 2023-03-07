interface ITodoListPlaceholderProps {
  percetages?: number[]
}

export const TodoListPlaceholder = ({
  percetages = [100, 85, 45, 75],
}: ITodoListPlaceholderProps) => {
  return (
    <ul className='list-none flex flex-col gap-2.5'>
      {percetages.map((percentage, index) => (
        <li className='flex justify-start gap-2.5' key={index}>
          <div className='w-5 h-5 rounded bg-gray-200'></div>
          <div
            className={`h-5 bg-gray-100 rounded`}
            style={{ width: `${percentage}%` }}
          ></div>
        </li>
      ))}
    </ul>
  )
}
