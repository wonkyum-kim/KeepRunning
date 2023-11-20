import Shoes from '@/app/ui/dashboard/shoes/shoes';
import getShoes from '@/app/actions/getShoes';
import AddShoesDialog from '@/app/ui/dashboard/shoes/addShoesDialog';

export default async function ShoesPage() {
  await getShoes();
  return (
    <div className='w-full min-h-full p-5 m-5 flex gap-8 bg-gray-50 rounded-lg'>
      <Shoes />
      <AddShoesDialog />
    </div>
  );
}
