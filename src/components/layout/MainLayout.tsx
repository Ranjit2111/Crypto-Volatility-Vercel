'use client'

import { Header } from "@/components/layout/Header";
import { ReactNode, useState, useEffect } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

// Define a type for the style of a single animated particle
interface ParticleStyle {
  width: string;
  height: string;
  top: string;
  left: string;
  opacity: number;
  boxShadow: string;
  filter: string;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [particleStyles, setParticleStyles] = useState<ParticleStyle[]>([]);

  useEffect(() => {
    // Generate styles only on the client-side after mount
    const generateStyles = () => {
      return Array.from({ length: 20 }).map(() => ({
        width: Math.random() * 5 + 1 + "px",
        height: Math.random() * 200 + 50 + "px",
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        opacity: Math.random() * 0.3 + 0.1,
        boxShadow: `0 0 ${Math.random() * 20 + 10}px ${
          Math.random() * 5 + 1
        }px var(--primary)`,
        filter: "blur(3px)",
      }));
    };
    setParticleStyles(generateStyles());
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Animated background pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-background opacity-90" />
        <div className="absolute inset-0">
          {particleStyles.map((style, i) => (
            <div
              key={i}
              className="absolute bg-primary/5"
              style={style}
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
              &copy; {new Date().getFullYear()} Crypto Volatility Tracker. All
              rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              Created by Ranjit
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 