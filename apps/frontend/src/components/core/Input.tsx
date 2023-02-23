import cx from 'classnames'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
}

export const Input = ({ fullWidth, ...props }: IInputProps) => {
  return (
    <input
      {...props}
      className={cx(
        'placeholder:text-cool-grey py-[10px] border-b-2 border-silver focus:outline-none',
        {
          'w-full': fullWidth,
        }
      )}
    />
  )
}
