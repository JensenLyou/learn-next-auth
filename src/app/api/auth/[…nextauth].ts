import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    Twitter({
      clientId: process.env.TWITTER_CONSUMER_KEY || "",
      clientSecret: process.env.TWITTER_CONSUMER_SECRET || "",
    }),
  ],
});
