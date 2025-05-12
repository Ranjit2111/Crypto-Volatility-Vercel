'use client'

import { useHealthCheck } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { BarChartBig, Github, Linkedin } from 'lucide-react';
import Link from "next/link";

export function Header() {
  const { isHealthy, isLoading } = useHealthCheck();
  
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <BarChartBig className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Crypto<span className="text-primary font-bold">Volatility</span>Tracker
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm flex items-center gap-2">
            <span className="text-muted-foreground">API Status:</span>
            {isLoading ? (
              <Badge variant="outline" className="gap-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse"></span>
                Checking...
              </Badge>
            ) : isHealthy ? (
              <Badge variant="outline" className="bg-accent/10 text-accent gap-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-accent"></span>
                Healthy
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-destructive/10 text-destructive gap-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-destructive"></span>
                Offline
              </Badge>
            )}
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-2 ml-2">
            <Link
              href="https://www.linkedin.com/in/ranjit-n/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-secondary/20 hover:bg-primary/20 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4 text-foreground hover:text-primary transition-colors" />
            </Link>
            <Link
              href="https://github.com/Ranjit2111/Crypto-Volatility-ML-Engineering"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-secondary/20 hover:bg-primary/20 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-4 w-4 text-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 