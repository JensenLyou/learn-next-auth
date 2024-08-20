import { defaultWagmiConfig } from "@web3modal/wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const projectId = "1";

export const config = defaultWagmiConfig({
  chains: [mainnet, sepolia],
  projectId,
  metadata: metadata,
});
