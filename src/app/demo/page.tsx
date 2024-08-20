"use client";

import { useAccount, useChainId, useSignMessage } from "wagmi";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import React from "react";

import LoginBtn from "../components/loginBtn";

export default function Demo() {
  const { address } = useAccount();

  const { signMessageAsync } = useSignMessage();
  const chainId = useChainId();

  const { data: session, status } = useSession();

  return (
    <div>
      <LoginBtn />
    </div>
  );
}
