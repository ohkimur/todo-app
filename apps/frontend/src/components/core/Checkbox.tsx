import { ReactComponent as CheckIcon } from '@/assets/svg/tick.svg'

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = ({ label, ...props }: ICheckboxProps) => {
  return (
    <div className='flex items-center gap-2'>
      <input type='checkbox' {...props} className='hidden peer' />
      <label
        htmlFor={props.id}
        className='w-[18px] h-[18px] bg-white border border-gray-400 rounded peer-checked:bg-dark-sky-blue peer-checked:border-none cursor-pointer flex items-center justify-center transition-all duration-200'
      >
        <CheckIcon />
      </label>
    </div>
  )
}
