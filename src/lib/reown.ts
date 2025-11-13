import { createAppKit } from "@reown/appkit/react";
import { arbitrumSepolia } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const appUrl = typeof window !== "undefined" ? window.location.origin : "https://streampay.app";

if (!projectId) {
  console.warn(
    "[Reown] Missing VITE_WALLETCONNECT_PROJECT_ID. WalletConnect AppKit will not be fully functional until this environment variable is set."
  );
}

export const appKit = createAppKit({
  projectId: projectId || "",
  networks: [arbitrumSepolia],
  defaultNetwork: arbitrumSepolia,
  metadata: {
    name: "StreamPay",
    description: "Trustless Web3 subscription payments on Arbitrum",
    url: appUrl,
    icons: [`${appUrl}/vite.svg`],
  },
});
