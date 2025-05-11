import { MainLayout } from "@/components/layout/MainLayout";
import { Hero } from "@/components/layout/Hero";
import { VolatilityChart } from "@/components/predictions/VolatilityChart";
import { PredictionTable } from "@/components/predictions/PredictionTable";
import { FeatureImportanceChart } from "@/components/predictions/FeatureImportanceChart";
import { CoinGrid } from "@/components/coins/CoinGrid";
import { CoinChartDisplay } from "@/components/coins/CoinChartDisplay";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />

      {/* Prediction Section */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <VolatilityChart />
            <PredictionTable />
            <FeatureImportanceChart />
          </div>
        </div>
      </section>

      {/* Coin Chart Section */}
      <section className="py-12 bg-secondary/5">
        <div className="container">
          <CoinChartDisplay />
        </div>
      </section>

      {/* Coin Grid Section */}
      <section className="py-12">
        <div className="container">
          <CoinGrid />
        </div>
      </section>
    </MainLayout>
  );
}
