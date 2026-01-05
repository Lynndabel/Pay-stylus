import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

// Simple component to display and test subscription IDs
export const SubscriptionTracker: React.FC = () => {
  const [subscriptionIds, setSubscriptionIds] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Load initial data
    loadSubscriptionIds();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      loadSubscriptionIds();
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [isRunning]);

  const loadSubscriptionIds = () => {
    // Check localStorage for new subscription IDs
    const storedIds: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("subscription_")) {
        const value = localStorage.getItem(key);
        if (value) {
          storedIds.push(`${key}: ${value}`);
        }
      }
    }
    setSubscriptionIds(storedIds);
  };

  const clearSubscriptionIds = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("subscription_")
    );
    keys.forEach((key) => localStorage.removeItem(key));
    setSubscriptionIds([]);
  };

  const addTestSubscription = () => {
    const testId = `test_${Date.now()}`;
    const planId = Math.floor(Math.random() * 3) + 1;
    localStorage.setItem(`subscription_plan_${planId}`, testId);
    loadSubscriptionIds(); // Refresh immediately
  };

  return (
    <Card className="max-w-2xl mx-auto mt-4 sm:mt-6 lg:mt-8">
      <CardHeader className="space-y-1.5 sm:space-y-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Subscription ID Tracker
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Testing subscription ID capture and display
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-5">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "destructive" : "default"}
            size="sm"
            className="flex-1 sm:flex-initial"
          >
            {isRunning ? "Stop Tracking" : "Start Tracking"}
          </Button>
          <Button 
            onClick={addTestSubscription} 
            variant="outline" 
            size="sm"
            className="flex-1 sm:flex-initial"
          >
            Add Test ID
          </Button>
          <Button 
            onClick={clearSubscriptionIds} 
            variant="outline" 
            size="sm"
            className="flex-1 sm:flex-initial"
          >
            Clear All
          </Button>
        </div>

        {/* Subscription IDs Display */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h4 className="font-medium text-sm mb-2 sm:mb-3 text-gray-900">
            Stored Subscription IDs ({subscriptionIds.length}):
          </h4>
          {subscriptionIds.length === 0 ? (
            <div className="text-center py-4 sm:py-6">
              <p className="text-gray-500 text-sm">No subscription IDs found</p>
              <p className="text-gray-400 text-xs mt-1">
                Click "Add Test ID" to create a sample
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 sm:max-h-80 overflow-y-auto">
              {subscriptionIds.map((id, index) => (
                <div
                  key={index}
                  className="text-xs sm:text-sm font-mono bg-white p-2 sm:p-2.5 rounded border border-gray-200 break-all hover:bg-gray-50 transition-colors"
                >
                  {id}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Indicator */}
        {isRunning && (
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-green-700 font-medium">
              Tracking active - Updates every 60 seconds
            </span>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <h5 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">
            How it works:
          </h5>
          <ul className="space-y-1 text-xs text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>This tracker shows subscription IDs stored in localStorage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Real IDs will appear here after successful subscriptions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>The tracker updates every 60 seconds when running</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Use "Add Test ID" to simulate subscription creation</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionTracker;
