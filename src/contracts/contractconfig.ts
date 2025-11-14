import CONTRACT_ABI_JSON from "../../smart-contract/abi.json" assert { type: "json" };

export const CONTRACT_CONFIG = {
  CONTRACT_ADDRESS: "0xdbb07ad146a1db553811a26c1e838bfa7fdb84cf",
  CONTRACT_ABI: CONTRACT_ABI_JSON as any,
  NETWORK_ID: 421614,
  NETWORK_NAME: "Arbitrum Sepolia",
  NETWORK_RPC_URL:
    (import.meta as any).env?.VITE_ARBITRUM_SEPOLIA_RPC_URL ||
    "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
};

export const CONTRACT_FUNCTIONS = {
  ProviderRegister: "registerProvider",
  CreatePlan: "createPlan",
  Subscribe: "subscribe",
  ProcessPayments: "processSubscriptionPayment",
  UserBalance: "getUserBalance",
  WithdrawBalance: "withdraw",
  AllPlans: "getPlans",
  Deposite: "deposit",
};

export const CONTRACT_ERRORS = {
  Unauthorized: "Unauthorized",
  InvalidInput: "InvalidInput",
  InsufficientFunds: "InsufficientFunds",
  NotFound: "NotFound",
};
