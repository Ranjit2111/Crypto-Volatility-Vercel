'use client'

import { useState } from "react";
import { useCoins, getCoinPlotUrl } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DownloadIcon, LineChart, RefreshCw, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Period = "1d" | "30d" | "1y";

export function CoinChartDisplay() {
  const { coins, isLoading: isLoadingCoins } = useCoins();
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("30d");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle coin selection
  const handleCoinChange = (value: string) => {
    setSelectedCoin(value);
    setHasError(false);
  };

  // Handle period change
  const handlePeriodChange = (value: Period) => {
    setPeriod(value);
    setHasError(false);
  };

  // Handle image download
  const handleDownload = () => {
    if (!selectedCoin) return;
    
    const url = getCoinPlotUrl(selectedCoin, period);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedCoin}_${period}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chart URL
  const chartUrl = selectedCoin ? getCoinPlotUrl(selectedCoin, period) : null;

  // Handle retry on error
  const handleRetry = () => {
    if (!selectedCoin) return;
    setHasError(false);
    setIsImageLoading(true);
  };

  // Get period label for display
  const getPeriodLabel = (period: Period): string => {
    switch (period) {
      case "1d": return "24 Hours";
      case "30d": return "30 Days";
      case "1y": return "1 Year";
    }
  };

  return (
    <Card className="glass-card overflow-hidden border-border/50">
      <CardHeader className="border-b border-border/40 pb-3">
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Price Chart</CardTitle>
            <CardDescription>
              View historical price charts for each cryptocurrency
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="coin-select"
              className="block text-sm font-medium text-foreground/90"
            >
              Select Cryptocurrency
            </label>
            <Select
              disabled={isLoadingCoins}
              value={selectedCoin || ""}
              onValueChange={handleCoinChange}
            >
              <SelectTrigger 
                className="w-full border-border/40 bg-secondary/30 backdrop-blur-sm hover:border-primary/60 focus:border-primary/70 focus:ring-1 focus:ring-primary/30 transition-all duration-200" 
                id="coin-select"
              >
                <SelectValue placeholder="Select a cryptocurrency" />
              </SelectTrigger>
              <SelectContent className="bg-card/95 backdrop-blur-lg border-border/50">
                {isLoadingCoins ? (
                  <SelectItem value="loading" disabled>
                    Loading coins...
                  </SelectItem>
                ) : coins.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    No coins available
                  </SelectItem>
                ) : (
                  coins.map((coin) => (
                    <SelectItem key={coin} value={coin}>
                      {coin.toUpperCase()}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <span className="block text-sm font-medium text-foreground/90">Time Period</span>
            <Tabs
              defaultValue="30d"
              value={period}
              onValueChange={(value) => handlePeriodChange(value as Period)}
              className="w-full"
            >
              <TabsList className="w-full bg-secondary/40 backdrop-blur-sm">
                <TabsTrigger 
                  value="1d" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
                >
                  1 Day
                </TabsTrigger>
                <TabsTrigger 
                  value="30d" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
                >
                  30 Days
                </TabsTrigger>
                <TabsTrigger 
                  value="1y" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
                >
                  1 Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm">
          {/* The following block for selectedCoin and period display is now commented out
          {selectedCoin && (
            <div className="absolute left-4 top-4 z-10 max-w-[80%] rounded-full bg-card/80 px-3 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-primary">{selectedCoin.toUpperCase()}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{getPeriodLabel(period)}</span>
              </div>
            </div>
          )}
          */}
          
          <AnimatePresence mode="wait">
            {!selectedCoin ? (
              <motion.div 
                key="empty"
                className="flex h-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <LineChart className="mx-auto mb-3 h-10 w-10 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    Select a cryptocurrency to view its chart
                  </p>
                </div>
              </motion.div>
            ) : isImageLoading ? (
              <motion.div 
                key="loading"
                className="flex h-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-primary/60" />
                  <p className="text-muted-foreground">Loading chart data...</p>
                </div>
              </motion.div>
            ) : hasError ? (
              <motion.div 
                key="error"
                className="flex h-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-destructive" />
                  <p className="mb-3 text-destructive">
                    Failed to load chart for {selectedCoin.toUpperCase()}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try again
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="chart"
                className="relative h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
                <Image
                  src={chartUrl || ""}
                  alt={`${selectedCoin} price chart for ${period}`}
                  className="h-full w-full object-contain"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  onLoadingComplete={() => setIsImageLoading(false)}
                  onError={() => {
                    setIsImageLoading(false);
                    setHasError(true);
                  }}
                  onLoadStart={() => setIsImageLoading(true)}
                  unoptimized // Important for dynamic image URLs from external API
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {selectedCoin && !hasError && !isImageLoading && (
          <motion.div 
            className="mt-4 flex justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-border/60 bg-secondary/30 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-all duration-200"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download Chart
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
} 