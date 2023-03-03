import cx from 'classnames'

interface ITodoListProps {
  children?: React.ReactNode
  className?: string
}

export const TodoList = ({ children, className = '' }: ITodoListProps) => {
  return (
    <ul
      className={cx('list-none flex flex-col gap-2.5', {
        [className]: className,
      })}
    >
      {children}
    </ul>
  )
}
