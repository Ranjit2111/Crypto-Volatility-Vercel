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

      {/* Prediction Section - Reverted to 2 columns, added ID */}
      <section id="predictions" className="py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2"> {/* Reverted to 2 columns */}
            <VolatilityChart />
            <PredictionTable />
            {/* FeatureImportanceChart removed from here */}
          </div>
        </div>
      </section>

      {/* Combined Chart Section - New section for CoinChartDisplay and FeatureImportanceChart */}
      <section className="py-12 bg-secondary/5">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2"> {/* Two columns for these charts */}
            <CoinChartDisplay />
            <FeatureImportanceChart /> {/* Moved here */}
          </div>
        </div>
      </section>

      {/* Coin Grid Section - Added ID */}
      <section id="coins" className="py-12">
        <div className="container">
          <CoinGrid />
        </div>
      </section>
    </MainLayout>
  );
}
