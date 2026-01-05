import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";
import { WalletConnect } from "./WalletConnect";
import { useWallet } from "../hooks/useWallet";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { address, isConnected } = useWallet();

  const navigation = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "My Subscriptions", href: "/subscriptions" },
    { name: "Wallet", href: "/wallet" },
    { name: "Provider Dashboard", href: "/provider" },
    { name: "Test Page", href: "/test" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-cyan-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-700 to-teal-600 bg-clip-text text-transparent">
                PayStylus
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 xl:space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
                  } px-3 py-2 text-sm font-semibold transition-colors rounded-lg whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Wallet Address - Hidden on small screens */}
              {isConnected && (
                <span className="hidden sm:inline text-xs lg:text-sm text-gray-600 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
              )}
              
              {/* Wallet Connection */}
              <div className="hidden sm:block">
                <WalletConnect />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-cyan-100 py-3 sm:py-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${
                      isActive(item.href)
                        ? "text-cyan-600 bg-cyan-50"
                        : "text-gray-600 hover:text-cyan-600 hover:bg-cyan-50"
                    } block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Wallet Section */}
                <div className="pt-3 mt-3 border-t border-cyan-100 space-y-3">
                  {isConnected && (
                    <div className="px-3 py-2 text-xs font-mono text-gray-600 bg-gray-50 rounded-lg">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </div>
                  )}
                  <div className="px-3">
                    <WalletConnect />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className="relative z-0">{children}</main>
    </div>
  );
};
