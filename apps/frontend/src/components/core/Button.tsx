import cx from 'classnames'
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  styleType?: 'cta' | 'linkCta' | 'link'
  fullWidth?: boolean
  active?: boolean
}

export const Button = ({
  children,
  styleType = 'cta',
  fullWidth = false,
  active = false,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cx('transition-colors duration-200', {
        'bg-dark-sky-blue text-white text-base font-normal px-4 py-2 rounded-md hover:bg-blue-500 active:text-blue-300 active:bg-blue-600':
          styleType === 'cta',
        'text-dark-sky-blue underline hover:text-blue-400 active:text-dark-blue-grey active:no-underline':
          styleType === 'linkCta',
        'w-full': fullWidth,
        'text-dark-blue-grey no-underline hover:underline':
          styleType === 'linkCta' && active,
        'underline hover:text-blue-400 text-sm active:text-dark-blue-grey active:no-underline':
          styleType === 'link',
      })}
      {...props}
    >
      {children}
    </button>
  )
}
