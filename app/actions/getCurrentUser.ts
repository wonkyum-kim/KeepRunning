import getSession from './getSession';
import prisma from '@/app/libs/prismadb';

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.name) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        name: session.user.name as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: unknown) {
    return null;
  }
}
