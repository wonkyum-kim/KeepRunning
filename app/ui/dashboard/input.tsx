'use client';

interface InputProps {
  label: string;
  id: string;
  type: string;
  name: string;
  register?: any;
}

export default function Input({ label, id, type, name, register }: InputProps) {
  return (
    <div className='flex flex-col gap-2 py-2'>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <input
        required
        name={name}
        id={id}
        type={type}
        autoComplete={id}
        {...register('id', { required: true })}
        className='
            form-input 
            block 
            w-full 
            rounded-md 
            border-0 
            text-gray-900 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6
            '
      />
    </div>
  );
}
