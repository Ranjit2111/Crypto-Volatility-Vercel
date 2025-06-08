import { MainLayout } from "@/components/layout/MainLayout";
import { Hero } from "@/components/layout/Hero";
import { VolatilityChart } from "@/components/predictions/VolatilityChart";
import { PredictionTable } from "@/components/predictions/PredictionTable";
import FeatureImportanceChart from "@/components/predictions/FeatureImportanceChart";
import { CoinGrid } from "@/components/coins/CoinGrid";
import { CoinChartDisplay } from "@/components/coins/CoinChartDisplay";
import { ModelPerformanceComparison } from "@/components/analytics/ModelPerformanceComparison";
import { FeatureEngineering } from "@/components/analytics/FeatureEngineering";
import { ProjectOverview } from "@/components/layout/ProjectOverview";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Info, ArrowRight, Clock } from "lucide-react";
import { ContextLink } from "@/components/ui/context-link";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />

      {/* Prediction Section - Reverted to 2 columns, added ID */}
      <section id="predictions" className="py-8 sm:py-12">
        <div className="container">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Volatility Predictions</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Our AI model analyzes historical data to predict which cryptocurrency will experience the highest
              volatility in the next 24 hours. These predictions can help traders anticipate market movements.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {/* First column - VolatilityChart at top, info card at bottom */}
            <div className="grid gap-6">
              <VolatilityChart />
              
              {/* Understanding Our Predictions card */}
              <Card className="glass-card border-border/50 overflow-hidden bg-secondary/5">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <div className="rounded-full bg-primary/20 p-2 sm:p-3 flex-shrink-0">
                      <Info className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium mb-2">Understanding Our Predictions</h3>
                      <p className="text-muted-foreground">
                        Our predictions show which cryptocurrency is likely to experience the highest absolute price movement 
                        in the next 24 hours, regardless of direction (up or down). Volatility represents the degree of 
                        price fluctuation, not the direction. Higher volatility typically means higher risk but also 
                        potential trading opportunities.
                      </p>
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary/70" />
                          <span>Predictions updated daily</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="h-4 w-4 text-primary/70" />
                          <span>Based on XGBoost model with {(89).toFixed(0)}% accuracy</span>
                          <ContextLink 
                            targetId="performance-context"
                            label="Why is this good?"
                            className="ml-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Second column - Prediction table only */}
            <PredictionTable />
          </div>
        </div>
      </section>

      {/* Combined Chart Section - Moved feature engineering explanation near feature importance chart */}
      <section className="py-8 sm:py-12 bg-secondary/5">
        <div className="container">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Market Analytics</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Explore historical price data and understand the key factors driving our model's predictions.
              These insights help visualize market trends and model decision-making processes.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* First column: Price Chart */}
            <div>
              <CoinChartDisplay />
            </div>
            
            {/* Second column: Feature Importance */}
            <div>
              <FeatureImportanceChart coin="bitcoin" />
            </div>
          </div>
        </div>
      </section>

      {/* Coin Grid Section - Added ID */}
      <section id="coins" className="py-8 sm:py-12">
        <div className="container">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Coin Universe</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Browse the cryptocurrencies we track in our prediction system. Click on any coin to view its CoinMarketCap page
              for more detailed market information.
            </p>
          </div>
          <CoinGrid />
        </div>
      </section>

      {/* Model Performance Comparison Section - Added ID */}
      <section id="model-evolution" className="py-8 sm:py-12 bg-secondary/5">
        <div className="container">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Model Evolution</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              See how our prediction model has evolved through rigorous feature engineering and hyperparameter tuning.
              The comparison below shows the significant performance improvements between our initial and current models.
            </p>
          </div>
          <ModelPerformanceComparison />
        </div>
      </section>

      {/* Feature Engineering Explanation Section - Added ID */}
      <section id="feature-engineering" className="py-8 sm:py-12">
        <div className="container">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Feature Engineering</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Our model uses carefully engineered features derived from raw price and volume data.
              Understanding these features helps provide insight into the model's prediction process.
            </p>
          </div>
          <FeatureEngineering />
        </div>
      </section>

      {/* Project Overview Section - Added ID */}
      <section id="project-overview" className="py-8 sm:py-12 bg-secondary/5">
        <div className="container">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Project Overview</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Learn about the technologies and methodologies used in building this full-stack machine learning application.
            </p>
          </div>
          <ProjectOverview />
        </div>
      </section>

      {/* Footer with Social Links */}
      <Footer />
    </MainLayout>
  );
}
