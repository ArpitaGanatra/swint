"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter as EthersAdapterImport } from "@reown/appkit-adapter-ethers";
import {
  mainnet,
  arbitrum,
  base,
  sepolia,
  avalanche,
  celo,
  binanceSmartChain,
} from "@reown/appkit/networks";

// 1. Get projectId at https://cloud.reown.com
const projectId = "be1c543939dbd66ef6e523248a000e7c";

// 2. Set Ethers adapters
const EthersAdapter = new EthersAdapterImport();

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

const fujiTestnet = {
  id: "43113",
  name: "Avalanche Fuji Testnet",
  network: "fuji",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
  },
  testnet: true,
  // Add the following properties
  chainId: "43113",
  chainNamespace: "eip155",
  currency: "AVAX",
  explorerUrl: "https://testnet.snowtrace.io",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
};

// 4. Create the AppKit instance
createAppKit({
  adapters: [EthersAdapter],
  metadata: metadata,
  networks: [
    mainnet,
    arbitrum,
    base,
    sepolia,
    avalanche,
    celo,
    binanceSmartChain,
  ],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKit({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col h-screen bg-[#F8F8F8] w-screen"
      style={{ height: "100vh" }}
    >
      <header
        className="flex justify-between items-center p-6 bg-white w-[100%]"
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="text-3xl font-bold text-[#333333]">Swint</div>
        <div className="flex items-center gap-2">
          <w3m-button />
        </div>
      </header>
      <main className="flex-1 w-full h-full">{children}</main>
    </div>
  );
}
