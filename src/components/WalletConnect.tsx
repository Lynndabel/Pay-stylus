import React, { useEffect, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { Button } from "./ui/Button";
import { Wallet, LogOut } from "lucide-react";
import { useWallet } from "../hooks/useWallet";

export const WalletConnect: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const appKit = useAppKit();
  const { isConnected, address, disconnectWallet } = useWallet();

  useEffect(() => setMounted(true), []);

  const openModal = async () => {
    await appKit?.open?.();
  };

  const chainId = (appKit as any)?.state?.network?.chainId as number | undefined;
  const networkName = chainId === 421614 ? "Arbitrum Sepolia" : chainId ? `Chain ${chainId}` : "Unknown";

  // Loading skeleton
  if (!mounted) {
    return (
      <div className="h-9 w-28 sm:w-36 bg-gray-200 animate-pulse rounded-lg" />
    );
  }

  // Connected state
  if (isConnected && address) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Network Badge - Desktop only */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-medium">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          <span className="whitespace-nowrap">{networkName}</span>
        </div>

        {/* Address Badge - Tablet and up */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium font-mono">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="hidden md:inline">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <span className="md:hidden">
            {address.slice(0, 4)}...{address.slice(-3)}
          </span>
        </div>

        {/* Disconnect Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnectWallet()}
          className="border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline sm:ml-2">Disconnect</span>
        </Button>
      </div>
    );
  }

  // Connect button
  return (
    <Button
      onClick={openModal}
      size="sm"
      className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
    >
      <Wallet className="w-4 h-4" />
      <span className="ml-2 hidden xs:inline">Connect Wallet</span>
      <span className="ml-1.5 xs:hidden text-xs">Connect</span>
    </Button>
  );
};
