'use client'

// import { useMemo } from "react"; // Removed unused import
import { useCoins } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import Image from "next/image";

export function CoinGrid() {
  const { coins, isLoading, isError } = useCoins();

  // Use all coins directly as search is removed
  const displayCoins = coins;

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
            <CardTitle>Coins Tracked</CardTitle>
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
              <CardTitle>Coins Tracked</CardTitle>
              <CardDescription>
                {coins.length} cryptocurrencies being tracked. Click on them to view their CoinMarketCap page.
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {displayCoins.length === 0 ? (
          <motion.div 
            className="flex h-[220px] items-center justify-center rounded-lg border border-border/30 bg-secondary/20 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-center text-muted-foreground">
              No coins available to display.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {displayCoins.map((coin, index) => (
              <a 
                key={coin} 
                href={`https://coinmarketcap.com/currencies/${coin.toLowerCase().replace(/\s+/g, '-')}/`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block no-underline"
              >
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  whileHover={{ y: -5 }}
                >
                  <div 
                    className={`relative h-full overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br ${getCoinGradient(index)} p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 group-hover:bg-opacity-100 flex flex-col justify-between`}
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
                            const target = e.target as HTMLImageElement;
                            target.src = `https://placehold.co/50x50/1E1E2D/00B3FF?text=${coin.substring(0, 2).toUpperCase()}`;
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
              </a>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
} 