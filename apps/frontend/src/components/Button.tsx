interface Props {
  children: React.ReactNode
}

export const Button = ({ children }: Props) => {
  return (
    <div className='bg-green-600 hover:scale-105 active:scale-100 hover:bg-green-500 cursor-pointer transition-all active:text-green-300 active:bg-green-700 text-green-50 px-6 py-4 rounded-md'>
      {children}
    </div>
  )
}
