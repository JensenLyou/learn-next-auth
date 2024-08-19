import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";

const providers = [
  Twitter({
    clientId: process.env.TWITTER_ID || "",
    clientSecret: process.env.TWITTER_SECRET || "",
    version: "2.0",
    httpOptions: {
      timeout: 10000,
    },
  }),
];

const handler = NextAuth({
  providers: providers,
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
