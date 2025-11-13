import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useAppKit } from "@reown/appkit/react";

export const useWallet = () => {
  const appKit = useAppKit();
  const status = appKit?.state?.status ?? "disconnected";
  const account = appKit?.state?.account;
  const address = account?.address ?? null;

  const connectWallet = useCallback(async () => {
    try {
      await appKit?.open?.();
    } catch (error) {
      console.error("Failed to open wallet modal", error);
      toast.error("Failed to connect wallet");
    }
  }, [appKit]);

  const disconnectWallet = useCallback(async () => {
    try {
      await appKit?.disconnect?.();
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Failed to disconnect wallet", error);
      toast.error("Failed to disconnect wallet");
    }
  }, [appKit]);

  const isConnecting = status === "connecting";
  const isConnected = status === "connected" && !!address;

  return useMemo(
    () => ({
      isConnected,
      address,
      isConnecting,
      connectWallet,
      disconnectWallet,
    }),
    [isConnected, address, isConnecting, connectWallet, disconnectWallet]
  );
};