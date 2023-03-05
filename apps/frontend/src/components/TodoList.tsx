import cx from 'classnames'
import { forwardRef } from 'react'

interface ITodoListProps {
  children?: React.ReactNode
  className?: string
}

export const TodoList = forwardRef<HTMLUListElement, ITodoListProps>(
  ({ children, className = '' }, ref) => {
    return (
      <ul
        ref={ref}
        className={cx('list-none flex flex-col gap-2.5', {
          [className]: className,
        })}
      >
        {children}
      </ul>
    )
  }
)
