import { getContests } from '@/app/lib/contests-data';
import Pagination from '@/app/ui/dashboard/contests/pagination';
import Table from '@/app/ui/dashboard/contests/table';
import { Suspense } from 'react';

export default async function ContestsPage({
  searchParams,
}: {
  searchParams?: {
    length?: string;
    onGoing?: string;
    page?: string;
  };
}) {
  const length = searchParams?.length || '';
  //   const onGoing = searchParams?.onGoing || '';
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getContests();
  const totalPages = Math.ceil(data.place.length / 10);

  return (
    <div className='w-full h-full p-5'>
      <Suspense key={currentPage}>
        <Table currentPage={currentPage} data={data} />
      </Suspense>
      <div className='flex items-center justify-center py-8'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
