import cx from 'classnames'
import { ButtonHTMLAttributes, forwardRef } from 'react'
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  styleType?: 'cta' | 'linkCta' | 'link'
  fullWidth?: boolean
  active?: boolean
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      styleType = 'cta',
      fullWidth = false,
      active = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cx('transition-colors duration-200', {
          'bg-blue-500 text-white text-base font-normal disabled:bg-gray-300 px-4 py-2 rounded-md hover:bg-blue-400 active:text-blue-200 active:bg-blue-600':
            styleType === 'cta',
          'text-blue-400 underline hover:text-blue-400 active:text-gray-700 active:no-underline disabled:text-gray-700 disabled:no-underline':
            styleType === 'linkCta',
          'w-full': fullWidth,
          'underline hover:text-blue-400 text-sm active:text-gray-700 active:no-underline':
            styleType === 'link',
          [className]: className,
        })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
