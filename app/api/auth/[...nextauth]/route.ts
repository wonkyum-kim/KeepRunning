import NextAuth, { NextAuthOptions } from 'next-auth';
import StravaProvider from 'next-auth/providers/strava';

export const AuthOptions: NextAuthOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID as string,
      clientSecret: process.env.STRAVA_SECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };

// 서버 컴포넌트는 getServerSession
