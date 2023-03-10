import { ReactComponent as PathCopy } from '@/assets/svg/x-mark.svg'
import cx from 'classnames'
import { forwardRef, InputHTMLAttributes, MouseEventHandler } from 'react'
import { Checkbox } from '.'

interface ITodoItemProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  className?: string
  onDelete?: MouseEventHandler<HTMLButtonElement>
}

export const TodoItem = forwardRef<HTMLLIElement, ITodoItemProps>(
  ({ children, className = '', onDelete, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cx('flex gap-3.5 w-full justify-between group', {
          [className]: className,
        })}
      >
        <span className='flex gap-3.5'>
          <Checkbox {...props} />
          <span className='text-base'>{children}</span>
        </span>
        <button
          className='group-hover:opacity-100 opacity-0 transition-all duration-200'
          onClick={onDelete}
        >
          <PathCopy />
        </button>
      </li>
    )
  }
)
