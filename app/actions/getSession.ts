import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

export default async function getSession() {
  return getServerSession(authOptions);
}
