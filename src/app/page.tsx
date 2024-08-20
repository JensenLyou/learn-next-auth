"use client";

import { useAccount, useChainId, useSignMessage } from "wagmi";
import LoginBtn from "./components/loginBtn";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";

export default function Home() {
  const { address } = useAccount();

  const { signMessageAsync } = useSignMessage();
  const chainId = useChainId();

  const { data: session, status } = useSession();

  console.log("session:", session);
  console.log("status:", status);

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div>
      <LoginBtn />

      <div>
        <button
          onClick={() => {
            handleLogin();
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
