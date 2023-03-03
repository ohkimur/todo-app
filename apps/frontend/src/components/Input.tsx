import cx from 'classnames'
import { forwardRef, InputHTMLAttributes } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ fullWidth, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cx(
          'placeholder:text-cool-grey py-[10px] border-b-2 border-silver focus:outline-none',
          {
            'w-full': fullWidth,
          }
        )}
      />
    )
  }
)
