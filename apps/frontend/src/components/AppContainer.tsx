import cx from 'classnames'

interface IAppContainerProps {
  children?: React.ReactNode
  className?: string
}

export const AppContainer = ({
  children,
  className = '',
}: IAppContainerProps) => {
  return (
    <div
      className={cx(
        'bg-gray-100 min-h-screen flex items-center justify-center',
        {
          [className]: className,
        }
      )}
    >
      {children}
    </div>
  )
}
