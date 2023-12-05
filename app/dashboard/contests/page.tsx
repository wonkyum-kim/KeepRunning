import getContests from '@/app/actions/getContests';
import Pagination from '@/app/ui/dashboard/contests/pagination';
import Table from '@/app/ui/dashboard/contests/table';

export default async function ContestsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getContests();
  const totalPages = Math.ceil(data.place.length / 10);

  return (
    <div className='w-full flex flex-col gap-4 p-5'>
      <Table currentPage={currentPage} data={data} />
      <div className='flex items-center justify-center py-8'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
