export interface Plan {
  id: string;
  providerId: string;
  providerName: string;
  name: string;
  description: string;
  price: string; // In ETH
  interval: 'monthly' | 'yearly';
  isActive: boolean;
  subscriberCount: number;
  createdAt: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  providerName: string;
  price: string;
  interval: 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'expired';
  nextPaymentDate: string;
  subscribedAt: string;
}

export interface EscrowBalance {
  total: string;
  withdrawable: string;
  pending: string;
}

export interface PaymentHistory {
  from: string;
  to: string;
  amount: string;
  subscriptionId: string;
  timestamp: string;
  txHash?: string;
}

export interface RecentSubscriber {
  subscriptionId: string;
  planId: string;
  user: string;
  planName: string;
  amount: string;
  timestamp: string;
}

export interface EarningsData {
  month: string;
  earnings: number;
}

export interface Transaction {
  type: 'deposit' | 'withdrawal' | 'subscription' | 'payment';
  amount: string;
  timestamp: string;
  hash: string;
  from?: string;
  to?: string;
}