import Twitter from "next-auth/providers/twitter";
import NextAuth from "next-auth";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const providers = [
  Twitter({
    clientId: process.env.TWITTER_ID!,
    clientSecret: process.env.TWITTER_SECRET!,
    version: "2.0",
    httpOptions: {
      timeout: 10000,
    },
  }),
  Credentials({
    name: "Ethereum",
    credentials: {
      message: {
        label: "Message",
        type: "text",
        placeholder: "0x0",
      },
      signature: {
        label: "Signature",
        type: "text",
        placeholder: "0x0",
      },
    },
    async authorize(credentials) {
      try {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));
        const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!);

        console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

        const result = await siwe.verify({
          signature: credentials?.signature || "",
          domain: nextAuthUrl.host,
          nonce: siwe.nonce,
        });

        if (result.success) {
          return {
            id: siwe.address,
          };
        }
        return null;
      } catch (e) {
        return null;
      }
    },
  }),
];

const handler = NextAuth({
  providers: providers,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith("/")
        ? new URL(url, baseUrl).toString()
        : url;
      console.log(
        `[next-auth] Redirecting to "${redirectUrl}" (resolved from url "${url}" and baseUrl "${baseUrl}")`
      );
      console.log("redirectUrl:", redirectUrl);
      return redirectUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signInUser", user);
      console.log("signInAccount", account);
      console.log("signInProfile", profile);
      console.log("signInEmail", email);
      console.log("signInCredentials", credentials);
      return !!user;
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT:", { token, user, account, profile });
      if (account) {
        if (account.provider === "twitter") {
          token.accessToken = "twitter:" + account.access_token;
          token.provider = account.provider;
          token.providerId = account.id;
        }
      } else {
        token.provider = "Ethereum";

        console.log("EthereumJWT:", { token, user });
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.token = token;

      console.log("session:", session);

      // const user = await prisma.user.create({
      //   data: {
      //     name: "Jassen",
      //     address: token.sub,
      //     jti: token.jti,
      //     createDate: new Date(token.iat),
      //     expireDate: new Date(token.exp),
      //   },
      // });
      // console.log(user);

      return session;
    },
  },
});
export { handler as GET, handler as POST };
