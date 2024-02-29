import getContests from '@/app/actions/getContests';
import Table from './components/table';
import Pagination from './components/pagination';

interface ContestPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function ContestPage({ searchParams }: ContestPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getContests();
  const totalPages = Math.ceil(data.place.length / 10);
  return (
    <div className='w-full flex flex-col gap-4 mb-[100px]'>
      <h1 className='text-xl font-bold pb-4'>📅 대회 일정</h1>
      <p className='pb-2'>전국에서 열리는 마라톤 대회 정보들을 확인하세요.</p>
      <Table page={currentPage} data={data} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
