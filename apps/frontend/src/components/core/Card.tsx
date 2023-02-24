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
        'bg-white mx-5 px-[30px] py-[35px] rounded-md shadow-[0_2px_16px_0_rgba(0,0,0,0.1)] flex flex-col gap',
        {
          [className]: className,
        }
      )}
    >
      <header className='flex flex-col gap-[6px]'>
        <CheckIcon className='w-10 h-8 mb-[18px]' />
        {title ? <h1 className='font-bold text-[22px]'>{title}</h1> : null}
        {subTitle ? (
          <p className='text-base text-cool-grey-two'>{subTitle}</p>
        ) : null}
      </header>

      {children ? <main className='mt-[43px]'>{children}</main> : null}
    </div>
  )
}
