'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Activity, LineChart, PieChart } from "lucide-react";

// Define feature categories and their contents
const featureCategories = [
  {
    id: "volatility",
    name: "Volatility Measures",
    icon: <Activity className="h-5 w-5" />,
    features: [
      {
        name: "Realized Volatility (5d, 10d, 30d)",
        description: "Measures the historical volatility of prices over different time windows. Calculated as the standard deviation of log returns, providing insight into recent and medium-term price fluctuations."
      },
      {
        name: "EWMA Volatility (5d, 10d, 30d)",
        description: "Exponentially Weighted Moving Average Volatility gives more weight to recent observations. This helps capture regime changes in volatility more quickly than simple realized volatility."
      },
      {
        name: "Parkinson Volatility",
        description: "Uses high and low prices to estimate volatility. Often considered more efficient than close-to-close volatility as it incorporates intra-period price movements that might be missed in daily closing prices."
      }
    ]
  },
  {
    id: "momentum",
    name: "Momentum Indicators",
    icon: <TrendingUp className="h-5 w-5" />,
    features: [
      {
        name: "RSI (Relative Strength Index - 14d)",
        description: "A momentum oscillator measuring the speed and change of price movements. Values above 70 typically indicate overbought conditions, while values below 30 suggest oversold conditions."
      },
      {
        name: "MACD (Moving Average Convergence Divergence)",
        description: "A trend-following momentum indicator showing the relationship between two moving averages. Helps identify potential trend changes and momentum shifts in the market."
      },
      {
        name: "Momentum (5d, 10d)",
        description: "Measures the rate of acceleration in a security's price. Positive values indicate upward momentum, while negative values suggest downward momentum."
      }
    ]
  },
  {
    id: "bands",
    name: "Volatility Bands",
    icon: <LineChart className="h-5 w-5" />,
    features: [
      {
        name: "Bollinger Band Width",
        description: "Measures the distance between the upper and lower Bollinger Bands relative to the middle band. Indicates market tightness or expected volatility - narrow bands suggest low volatility while wide bands suggest high volatility."
      },
      {
        name: "Bollinger Band Position",
        description: "Shows where the current price is relative to the Bollinger Bands. Values near 1 indicate price is near the upper band, while values near 0 indicate price is near the lower band."
      }
    ]
  }
];

export function FeatureEngineering() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="volatility" className="w-full">
        <div className="flex justify-center mb-4 sm:mb-6">
          <TabsList className="bg-secondary/40 backdrop-blur-sm">
            {featureCategories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {featureCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {category.features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="h-full glass-card overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{feature.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <Card className="glass-card overflow-hidden border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <PieChart className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Feature Importance</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Not all features contribute equally to predictions. Through careful feature selection, our model prioritizes the most informative
            signals while discarding those that add noise. The Feature Importance chart (available in the Market Analytics section) 
            visualizes which features contribute most to the model's decisions.
          </p>
          
          <div className="p-4 rounded-lg bg-secondary/20 border border-border/40">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              Why Feature Engineering Matters
            </h4>
            <p className="text-sm text-muted-foreground">
              Raw price data alone provides limited predictive power. By transforming this data into meaningful signals through feature 
              engineering, we extract patterns that might not be immediately obvious. This approach led to a 32% improvement in 
              predictive accuracy compared to our initial model.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 