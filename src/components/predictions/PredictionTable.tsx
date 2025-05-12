'use client'

import { useProcessedPredictions } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function PredictionTable() {
  const { data, isLoading, isError } = useProcessedPredictions();

  // Render loading skeleton
  if (isLoading && !data) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-72" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (isError) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Prediction Details</CardTitle>
          <CardDescription>Failed to load prediction data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-destructive">An error occurred while fetching the data.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render empty state
  if (!data) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Prediction Details</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-muted-foreground">No prediction data available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Prediction Details</CardTitle>
        <CardDescription>
          Predictions for: <span className="font-mono">{data.date}</span> (next 24h outlook)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Coin</TableHead>
                <TableHead className="text-right">Volatility Probability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sortedPredictions.map((prediction, index) => (
                <motion.tr
                  key={prediction.coin}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`${
                    prediction.coin === data.mostVolatileCoin
                      ? "bg-primary/10 hover:bg-primary/20"
                      : ""
                  }`}
                >
                  <TableCell className="font-mono">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {prediction.coin.toUpperCase()}
                      {prediction.coin === data.mostVolatileCoin && (
                        <Badge className="bg-primary text-primary-foreground">
                          Top Pick
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {(prediction.volatility_probability * 100).toFixed(2)}%
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </CardContent>
    </Card>
  );
} 