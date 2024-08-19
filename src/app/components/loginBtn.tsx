"use client";
import { useSession, signIn } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    const data = await signIn();
    console.log("data", data);
  };

  return session?.user_twitter?.data?.id ? (
    <>your twitter id is: ${session?.user_twitter.data.id}</>
  ) : (
    <>
      Not signed in <br />
      <button onClick={handleSignIn}>Sign in with twitter</button>
    </>
  );
}
