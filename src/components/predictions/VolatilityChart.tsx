'use client'

import { useEffect, useRef } from "react";
import { useProcessedPredictions } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Chart, registerables } from "chart.js";
import { RefreshCw, TrendingUp } from "lucide-react";

// Register Chart.js components
Chart.register(...registerables);

export function VolatilityChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { data, isLoading, isError, refresh } = useProcessedPredictions();

  // Create or update chart when data changes
  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create horizontal bar chart with improved styling
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: data.chartData,
      options: {
        indexAxis: "y", // Horizontal bar
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(15, 15, 24, 0.95)",
            titleFont: {
              family: "'Inter', sans-serif",
              size: 14,
              weight: "bold",
            },
            bodyFont: {
              family: "'JetBrains Mono', monospace",
              size: 14,
            },
            padding: 15,
            cornerRadius: 8,
            borderColor: "rgba(42, 42, 60, 1)",
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                return `Probability: ${(value * 100).toFixed(2)}%`;
              },
              title: (items) => {
                const index = items[0].dataIndex;
                const coin = data.chartData.labels?.[index] as string || "";
                return coin.toUpperCase();
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 1,
            ticks: {
              callback: (value) => `${(Number(value) * 100).toFixed(0)}%`,
              color: "rgba(224, 224, 224, 0.7)",
              font: {
                family: "'JetBrains Mono', monospace",
                size: 11,
              },
            },
            grid: {
              color: "rgba(42, 42, 60, 0.3)",
            },
          },
          y: {
            ticks: {
              color: "rgba(224, 224, 224, 0.9)",
              font: {
                family: "'Inter', sans-serif",
                size: 12,
                weight: "bold",
              },
              callback: (value) => {
                const coin = data.chartData.labels?.[value as number] as string;
                return coin?.toUpperCase() || "";
              },
            },
            grid: {
              display: false,
            },
          },
        },
        animation: {
          delay: (context) => context.dataIndex * 100,
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data]);

  // Handle refresh click
  const handleRefresh = () => {
    refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card overflow-hidden border-border/50">
        <CardHeader className="pb-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Volatility Predictions</CardTitle>
            </div>
          </div>
          <CardDescription className="text-muted-foreground mt-1">
            Probability of each coin being the most volatile in the next 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative h-[320px] w-full">
            {isLoading && !data ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-[280px] w-full rounded-lg" />
              </div>
            ) : isError ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                <p className="text-center text-destructive">
                  Failed to load prediction data
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
              </div>
            ) : data ? (
              <motion.div
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Predictions for: <span className="font-mono">{data.date}</span> (next 24h outlook)
                  </span>
                  <span className="font-numeric text-primary">
                    Top Pick: {data.mostVolatileCoin.toUpperCase()}
                  </span>
                </div>
                <div className="relative h-[280px]">
                  <canvas ref={chartRef} className="h-full w-full"></canvas>
                  <div className="absolute inset-0 pointer-events-none rounded-lg border border-border/10"></div>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-center text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 