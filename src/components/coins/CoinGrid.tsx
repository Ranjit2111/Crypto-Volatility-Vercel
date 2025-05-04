'use client'

import { useState, useMemo } from "react";
import { useCoins } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, X, Coins } from "lucide-react";
import Image from "next/image";

export function CoinGrid() {
  const { coins, isLoading, isError } = useCoins();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter coins based on search term
  const filteredCoins = useMemo(() => {
    if (!searchTerm.trim()) return coins;
    return coins.filter((coin) =>
      coin.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coins, searchTerm]);

  // Get crypto icon URL
  const getCryptoIconUrl = (coinId: string) => {
    return `https://cryptoicons.org/api/icon/${coinId.toLowerCase()}/50`;
  };

  // Get coin background gradient
  const getCoinGradient = (index: number) => {
    const gradients = [
      "from-primary/20 to-primary/5",
      "from-accent/20 to-accent/5",
      "from-indigo-500/20 to-indigo-500/5",
      "from-violet-600/20 to-violet-600/5",
      "from-fuchsia-500/20 to-fuchsia-500/5",
    ];
    return gradients[index % gradients.length];
  };

  // Render loading skeleton
  if (isLoading) {
    return (
      <Card className="glass-card overflow-hidden border-border/50">
        <CardHeader className="border-b border-border/40 pb-3">
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-72" />
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="pb-5">
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="aspect-square h-full w-full rounded-xl"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (isError) {
    return (
      <Card className="glass-card overflow-hidden border-border/50">
        <CardHeader className="border-b border-border/40 pb-3">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            <CardTitle>Coin Universe</CardTitle>
          </div>
          <CardDescription>Failed to load available coins</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex h-[220px] items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-6">
            <p className="text-center text-destructive">
              An error occurred while fetching the available coins
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card overflow-hidden border-border/50">
      <CardHeader className="border-b border-border/40 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Coin Universe</CardTitle>
              <CardDescription>
                {coins.length} cryptocurrencies being tracked
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className="mt-2 sm:mt-0 border-border/60 bg-secondary/30 backdrop-blur-sm"
          >
            <span className="font-mono text-primary">{filteredCoins.length}</span>{" "}
            <span className="text-foreground/80">
              coins{filteredCoins.length !== coins.length && " displayed"}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="pb-5">
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search for a cryptocurrency..."
              className="w-full rounded-lg border border-border/40 bg-secondary/30 pl-10 pr-10 py-2.5 text-foreground placeholder:text-muted-foreground backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {filteredCoins.length === 0 ? (
          <motion.div 
            className="flex h-[220px] items-center justify-center rounded-lg border border-border/30 bg-secondary/20 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-center text-muted-foreground">
              No coins match your search criteria
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCoins.map((coin, index) => (
              <motion.div
                key={coin}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className={`relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br ${getCoinGradient(index)} p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 group-hover:bg-opacity-100`}
                >
                  <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-primary/10 blur-xl filter group-hover:bg-primary/20" />
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative mb-1 h-14 w-14">
                      <div className="absolute inset-0 rounded-full bg-card shadow-inner" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-background/80 to-background/20 opacity-80 backdrop-blur-sm" />
                      <Image
                        src={getCryptoIconUrl(coin)}
                        alt={coin}
                        className="relative z-10 h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
                        width={50}
                        height={50}
                        unoptimized
                        onError={(e) => {
                          (e.target as any).src = `https://placehold.co/50x50/1E1E2D/00B3FF?text=${coin.substring(0, 2).toUpperCase()}`;
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium tracking-wide transition-colors duration-300 group-hover:text-primary">
                        {coin.length > 12
                          ? `${coin.substring(0, 12)}...`
                          : coin.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary/80 to-accent/80 transition-all duration-300 ease-in-out group-hover:w-full" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
} 