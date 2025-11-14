import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { usePayStylusContract } from "../hooks/useContract";
import { Subscription, PaymentHistory } from "../types";
import { useWallet } from "../hooks/useWallet";
import { Button } from "../components/ui/Button";

export const Subscriptions: React.FC = () => {
  const { getUserSubscriptions, getPaymentHistory, getAllPlansWithDetails } =
    usePayStylusContract();
  const { isConnected, address } = useWallet();

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isConnected || !address) {
        setLoadingData(false);
        return;
      }
      
      setLoadingData(true);
      try {
        const [subs, payments, plans] = await Promise.all([
          getUserSubscriptions(address),
          getPaymentHistory(address),
          getAllPlansWithDetails(),
        ]);

        const mappedSubs: Subscription[] = (subs || []).map((s: any) => {
          const plan = (plans || []).find((p: any) => p.id === s.planId);
          return {
            id: s.subscriptionId || `${s.planId}_${s.createdAt}`,
            planId: s.planId,
            planName: plan?.name ?? `Plan ${s.planId}`,
            providerName: plan?.providerName ?? s.user,
            price: plan?.price ?? "0",
            interval: plan?.interval ?? "monthly",
            status: "active",
            nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            subscribedAt: s.createdAt,
          };
        });

        setSubscriptions(mappedSubs);
        setPaymentHistory(payments || []);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
        setSubscriptions([]);
        setPaymentHistory([]);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent>
            <div className="text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Wallet Connection Required
              </h2>
              <p className="text-gray-600 mb-6">
                Please connect your wallet to view your subscriptions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Subscriptions</h1>
              <p className="text-gray-600 mt-2">
                Manage your active subscriptions and payment history
              </p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="flex items-center space-x-2"
            >
              🔄 Refresh
            </Button>
          </div>
        </div>

        {loadingData ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Subscriptions</h2>
              {subscriptions.length === 0 ? (
                <Card>
                  <CardContent>
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No active subscriptions</p>
                      <Button onClick={() => (window.location.href = "/marketplace")} variant="outline">
                        Browse Marketplace
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((subscription) => (
                    <Card key={subscription.id}>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{subscription.planName}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${"text-green-600 bg-green-100"}`}>
                                {subscription.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{subscription.providerName}</p>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-600 font-mono">🆔 Subscription ID: {subscription.id}</p>
                              <p className="text-sm text-gray-700">Price: {subscription.price} ETH</p>
                              <p className="text-sm text-gray-500">Next payment: {new Date(subscription.nextPaymentDate).toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => alert('Canceling subscriptions is not supported on-chain in this contract')}>Cancel</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment History</h2>
              {paymentHistory.length === 0 ? (
                <Card>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No payment history available</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {paymentHistory.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <div>
                        <div className="font-medium">{p.subscriptionId ? `Subscription ${p.subscriptionId}` : 'On-chain payment'}</div>
                        <div className="text-sm text-gray-500">{p.timestamp}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{p.amount} ETH</div>
                        <div className="text-sm text-gray-500">{p.from} → {p.to}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
