import { ReactComponent as CheckIcon } from '@/assets/svg/group.svg'

interface ICardProps {
  children?: React.ReactNode
  footer?: React.ReactNode
}

export const Card = ({ children, footer }: ICardProps) => {
  return (
    <div className='bg-white px-[30px] py-[35px] rounded-md shadow-[0_2px_16px_0_rgba(0,0,0,0.1)] flex flex-col gap'>
      <header className='flex flex-col gap-6'>
        <CheckIcon className='w-10 h-8' />
        <h1 className='font-bold text-[22px]'>Todo List</h1>
      </header>

      {children ? <main className='mt-[43px]'>{children}</main> : null}
      {footer ? <footer className='mt-[43px]'>{footer}</footer> : null}
    </div>
  )
}
