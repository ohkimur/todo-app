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
        'bg-light-grey min-h-screen flex items-center justify-center',
        {
          [className]: className,
        }
      )}
    >
      {children}
    </div>
  )
}
