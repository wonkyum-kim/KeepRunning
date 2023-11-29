import Sidebar from '@/app/ui/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col md:flex-row min-h-full p-2'>
      <Sidebar />
      {children}
    </div>
  );
}
