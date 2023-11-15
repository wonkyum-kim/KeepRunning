import NextAuth from 'next-auth';
import { authOptions } from './options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// 서버 컴포넌트는 getServerSession
// 이거 유튜브보고 옵션은 따로 빼야할듯?
