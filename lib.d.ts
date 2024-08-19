import { DefaultSession } from "next-auth";
import { TwitterProfile } from "next-auth/providers/twitter";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user_wallet: {
      address: string;
      chainId: number;
      uid: string;
      authorization: string;
    };
    user_twitter: TwitterProfile;
  }
}
