'use client'

import { useHealthCheck } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { isHealthy, isLoading } = useHealthCheck();
  
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary animate-pulse-glow">⟁</span>
            <h1 className="ml-2 text-xl font-bold tracking-tight text-white">
              Crypto<span className="text-primary">Volatility</span>Watcher
            </h1>
          </div>
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
        </div>
      </div>
    </header>
  );
} 