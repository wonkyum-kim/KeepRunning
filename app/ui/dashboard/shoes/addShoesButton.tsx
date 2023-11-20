import Image from 'next/image';

export default function AddShoesButton() {
  return (
    <button className="hover:bg-gray-400 cursor-pointer rounded-lg font-black flex flex-col gap-4 items-center justify-center w-full lg:w-[450px] h-[450px] bg-gray-500 shadow-lg shadow-gray-400'">
      <Image src='/Add.svg' width={80} height={80} alt='add' />
    </button>
  );
}
