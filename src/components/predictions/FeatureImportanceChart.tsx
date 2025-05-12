'use client'

import { useState, useEffect } from "react";
import { getFeatureImportancePlotUrl } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, RefreshCw, AlertTriangle, DownloadIcon, BarChartBig } from "lucide-react";
import Image from "next/image";
import { ContextLink } from "@/components/ui/context-link";

interface FeatureImportanceChartProps {
  coin: string;
}

const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [triggerFetch, setTriggerFetch] = useState(0);

  useEffect(() => {
    console.log("[Effect] Running. triggerFetch:", triggerFetch);
    setIsLoading(true);
    setHasError(false);
    try {
      const url = getFeatureImportancePlotUrl();
      const newUrl = `${url}?cachebust=${Date.now()}`;
      console.log("[Effect] Setting chartUrl to:", newUrl);
      setChartUrl(newUrl);
    } catch (error) {
      console.error("[Effect] Error constructing feature importance plot URL:", error);
      setHasError(true);
      setIsLoading(false);
      setChartUrl(null);
    }
  }, [triggerFetch]);

  const handleRefresh = () => {
    console.log("[Refresh] Clicked");
    setTriggerFetch(prev => prev + 1);
  };

  const handleDownload = () => {
    if (!chartUrl) return;
    const actualUrl = chartUrl.split('?')[0];
    const link = document.createElement("a");
    link.href = actualUrl;
    link.download = "feature_importance.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  console.log("[Render] isLoading:", isLoading, "hasError:", hasError, "chartUrl:", chartUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card overflow-hidden border-border/50">
        <CardHeader className="pb-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                <CardTitle>Feature Importance</CardTitle>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Features influencing model predictions with largest impact shown as bigger pie segments
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="h-8 w-8 p-0 border-border/60 hover:border-primary/70 hover:bg-secondary/50"
                disabled={!chartUrl || hasError || isLoading}
              >
                <DownloadIcon className="h-4 w-4 text-primary" />
                <span className="sr-only">Download chart</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="h-8 w-8 p-0 border-border/60 hover:border-primary/70 hover:bg-secondary/50"
                disabled={isLoading && !hasError}
              >
                <RefreshCw
                  className={`h-4 w-4 text-primary ${isLoading && !hasError ? "animate-spin" : ""}`}
                />
                <span className="sr-only">Refresh data</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative h-[560px] w-full">
            <AnimatePresence mode="wait">
              {chartUrl && !hasError && (
                <motion.div
                  key={chartUrl}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-[500px] w-full rounded-lg overflow-hidden border border-border/20"
                >
                  <Image
                    src={chartUrl}
                    alt={`Feature Importance Plot`}
                    layout="fill"
                    objectFit="contain"
                    unoptimized 
                    onLoad={() => {
                      console.log("[Image onLoad] Image loaded successfully. URL:", chartUrl);
                      setIsLoading(false);
                      setHasError(false);
                    }}
                    onError={(e) => {
                      console.error("[Image onError] Image failed to load. URL:", chartUrl, "Error:", e);
                      setHasError(true);
                      setIsLoading(false);
                    }}
                    priority
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-lg border border-border/10"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-card/30 backdrop-blur-sm rounded-lg"
              >
                <BarChartBig className="h-12 w-12 text-blue-500 animate-pulse" />
                <p className="text-lg font-semibold text-gray-300 mt-2">Loading chart...</p>
              </motion.div>
            )}

            {hasError && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4"
              >
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <p className="text-center text-sm text-destructive">
                  Failed to load feature importance chart.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try again
                </Button>
              </motion.div>
            )}

            {!isLoading && !hasError && !chartUrl && (
                 <motion.div
                    key="no-data"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                 >
                    <PieChart className="h-10 w-10 text-muted-foreground opacity-50 mb-2" />
                    <p className="text-sm text-muted-foreground">Chart data is unavailable.</p>
                 </motion.div>
            )}
          </div>
          
          {/* Feature importance explanation - directly in the card */}
          {!isLoading && !hasError && chartUrl && (
            <div className="mt-3 p-3 rounded-lg bg-secondary/20 border border-border/40 flex justify-center">
              <ContextLink 
                targetId="feature-engineering"
                label="Learn more about our features"
                className="font-medium"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureImportanceChart; 