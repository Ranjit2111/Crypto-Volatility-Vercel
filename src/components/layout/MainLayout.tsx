'use client'

import { Header } from "@/components/layout/Header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Animated background pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-background opacity-90" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-primary/5"
              style={{
                width: Math.random() * 5 + 1 + "px",
                height: Math.random() * 200 + 50 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.3 + 0.1,
                boxShadow: `0 0 ${Math.random() * 20 + 10}px ${
                  Math.random() * 5 + 1
                }px var(--primary)`,
                filter: "blur(3px)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/80 backdrop-blur-sm py-6">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Crypto Volatility Watcher. All
              rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              Powered by XGBoost ML & FastAPI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 