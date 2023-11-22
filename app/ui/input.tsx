interface InputProps {
  id: string;
  label: string;
  type: string;
}

export default function Input({ id, label, type }: InputProps) {
  return (
    <div className='flex gap-4 p-2 flex-col lg:flex-row'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className='
            form-input
            block 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-
            pl-4
        '
      />
    </div>
  );
}
