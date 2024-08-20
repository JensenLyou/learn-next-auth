"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useSession, signIn } from "next-auth/react";
import { useAccount } from "wagmi";

export default function LoginBtn() {
  const { data: session } = useSession();

  const { open } = useWeb3Modal();

  const { address } = useAccount();

  const handleSignIn = async () => {
    const data = await signIn("twitter");
    console.log("data", data);
  };

  console.log("address:", address);
  console.log("session:", session);

  return (
    <div>
      <div>
        {address ? (
          address
        ) : (
          <button
            onClick={() => {
              open();
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
      {session?.user_twitter?.data?.id ? (
        <>your twitter id is: ${session?.user_twitter.data.id}</>
      ) : (
        <>
          Not signed in <br />
          <button onClick={handleSignIn}>Sign in with twitter</button>
        </>
      )}
    </div>
  );
}
