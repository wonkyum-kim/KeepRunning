import StravaProvider from 'next-auth/providers/strava';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID as string,
      clientSecret: process.env.STRAVA_SECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
