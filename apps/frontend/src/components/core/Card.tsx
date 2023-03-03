import { ReactComponent as CheckIcon } from '@/assets/svg/check.svg'
import cx from 'classnames'

interface ICardProps {
  children?: React.ReactNode
  className?: string
  title?: string
  subTitle?: string
}

export const Card = ({
  children,
  className = '',
  title,
  subTitle,
}: ICardProps) => {
  return (
    <div
      className={cx(
        'bg-white mx-5 px-[30px] py-[35px] rounded-lg shadow-lg flex flex-col gap',
        {
          [className]: className,
        }
      )}
    >
      <header className='flex flex-col gap-2'>
        <CheckIcon className='w-10 h-8 mb-5' />
        {title ? <h1 className='font-bold text-xl'>{title}</h1> : null}
        {subTitle ? (
          <p className='text-base text-gray-500'>{subTitle}</p>
        ) : null}
      </header>

      {children ? <main className='mt-10'>{children}</main> : null}
    </div>
  )
}
