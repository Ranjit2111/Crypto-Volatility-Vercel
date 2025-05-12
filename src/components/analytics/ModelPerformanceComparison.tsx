'use client'

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, CheckCircle } from "lucide-react";

const metrics = {
  untuned: {
    accuracy: 0.57,
    precision: 0.46,
    recall: 0.38,
    f1Score: 0.41,
    rocAuc: null // Not available for untuned model
  },
  tuned: {
    accuracy: 0.89,
    precision: 0.70,
    recall: 0.71,
    f1Score: 0.69,
    rocAuc: 0.88
  }
}

export function ModelPerformanceComparison() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Metrics Comparison */}
        <Card className="glass-card overflow-hidden border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Performance Metrics Comparison</h3>
            </div>
            
            <div className="space-y-6">
              {/* Accuracy */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">Accuracy</span>
                  <div className="flex gap-4">
                    <span className="text-sm font-mono text-muted-foreground">Initial: {(metrics.untuned.accuracy * 100).toFixed(0)}%</span>
                    <span className="text-sm font-mono text-primary">Tuned: {(metrics.tuned.accuracy * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/30 rounded-full" style={{ width: `${metrics.untuned.accuracy * 100}%` }} />
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden mt-1">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${metrics.tuned.accuracy * 100}%` }} 
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
              
              {/* Precision */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">Precision</span>
                  <div className="flex gap-4">
                    <span className="text-sm font-mono text-muted-foreground">Initial: {(metrics.untuned.precision * 100).toFixed(0)}%</span>
                    <span className="text-sm font-mono text-primary">Tuned: {(metrics.tuned.precision * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/30 rounded-full" style={{ width: `${metrics.untuned.precision * 100}%` }} />
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden mt-1">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${metrics.tuned.precision * 100}%` }} 
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-primary rounded-full" 
                  />
                </div>
              </div>
              
              {/* Recall */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">Recall</span>
                  <div className="flex gap-4">
                    <span className="text-sm font-mono text-muted-foreground">Initial: {(metrics.untuned.recall * 100).toFixed(0)}%</span>
                    <span className="text-sm font-mono text-primary">Tuned: {(metrics.tuned.recall * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/30 rounded-full" style={{ width: `${metrics.untuned.recall * 100}%` }} />
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden mt-1">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${metrics.tuned.recall * 100}%` }} 
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
              
              {/* F1-Score */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">F1-Score</span>
                  <div className="flex gap-4">
                    <span className="text-sm font-mono text-muted-foreground">Initial: {(metrics.untuned.f1Score * 100).toFixed(0)}%</span>
                    <span className="text-sm font-mono text-primary">Tuned: {(metrics.tuned.f1Score * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/30 rounded-full" style={{ width: `${metrics.untuned.f1Score * 100}%` }} />
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden mt-1">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${metrics.tuned.f1Score * 100}%` }} 
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
              
              {/* ROC AUC (only for tuned model) */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">ROC AUC</span>
                  <div className="flex gap-4">
                    <span className="text-sm font-mono text-muted-foreground">Initial: N/A</span>
                    <span className="text-sm font-mono text-primary">Tuned: {(metrics.tuned.rocAuc * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden">
                  <div className="h-full bg-transparent rounded-full" />
                </div>
                <div className="h-2.5 w-full bg-secondary/40 rounded-full overflow-hidden mt-1">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${metrics.tuned.rocAuc * 100}%` }} 
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-primary/30 rounded-full"></div>
              <span>Initial Model</span>
              <div className="w-3 h-3 bg-primary rounded-full ml-4"></div>
              <span>Tuned Model</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Right: Key Improvements */}
        <Card className="glass-card overflow-hidden border-border/50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Key Improvements</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Advanced Feature Engineering</h4>
                  <p className="text-sm text-muted-foreground">Implementation of sophisticated features like Realized Volatility, EWMA, RSI, and Bollinger Bands significantly improved model performance.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Hyperparameter Tuning</h4>
                  <p className="text-sm text-muted-foreground">Optimization using RandomizedSearchCV with time-series aware cross-validation enhanced model accuracy by 32%.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Feature Selection</h4>
                  <p className="text-sm text-muted-foreground">Identifying and retaining only the most impactful features reduced noise and improved generalization capability.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground">Time-Series Cross-Validation</h4>
                  <p className="text-sm text-muted-foreground">Implementation of proper time-series validation prevented data leakage and ensured realistic performance estimation.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-secondary/20 border border-border/40" id="performance-context">
              <h4 className="font-medium mb-2">Performance in Context</h4>
              <p className="text-sm text-muted-foreground">
                Achieving 89% accuracy and 70% precision/recall in cryptocurrency volatility prediction is particularly impressive 
                considering the inherent challenges: high noise-to-signal ratio, non-stationarity, external influence factors, 
                market inefficiency, and susceptibility to black swan events.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 