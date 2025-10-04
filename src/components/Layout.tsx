import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Wallet, Menu, X } from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import { useState } from "react";
import { PushUniversalAccountButton } from "@pushchain/ui-kit";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "My Subscriptions", href: "/subscriptions" },
    { name: "Wallet", href: "/wallet" },
    { name: "Provider Dashboard", href: "/provider" },
    { name: "Test Page", href: "/test" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">StreamPay</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-900"
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Wallet Connection */}
            <div className="p-4 border-b">
            <PushUniversalAccountButton />
          </div>
            </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    } block px-3 py-2 rounded-lg text-sm font-medium transition-colors`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};
