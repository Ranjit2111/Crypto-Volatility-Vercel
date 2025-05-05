// API service for communicating with FastAPI backend
import { useMemo } from 'react';
import useSWR from 'swr';

// Define the API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Define types for API responses
export interface CoinPrediction {
  coin: string;
  volatility_probability: number;
}

export interface PredictionResponse {
  prediction_date: string;
  most_volatile_coin: string;
  predictions: CoinPrediction[];
}

// Create a fetcher function that handles the response and errors
const fetcher = async (url: string) => {
  const response = await fetch(`${API_BASE_URL}${url}`);
  
  // If the response is not successful, throw an error
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  
  return response.json();
};

// Custom hook for health check
export function useHealthCheck() {
  const { data, error, isLoading } = useSWR('/health', fetcher, {
    refreshInterval: 60000, // Check every minute
  });
  
  return {
    isHealthy: data?.status === 'ok',
    isLoading,
    isError: error
  };
}

// Custom hook for fetching predictions
export function usePredictions() {
  const { data, error, isLoading, mutate } = useSWR<PredictionResponse>('/predict', fetcher, {
    refreshInterval: 0, // Manual refresh only
    revalidateOnFocus: false,
  });
  
  return {
    predictions: data,
    isLoading,
    isError: error,
    refresh: mutate
  };
}

// Custom hook for fetching available coins
export function useCoins() {
  const { data, error, isLoading } = useSWR<string[]>('/coins', fetcher);
  
  return {
    coins: data || [],
    isLoading,
    isError: error
  };
}

// Function to get coin plot URL
export function getCoinPlotUrl(coin: string, period: '1y' | '30d' | '1d' = '30d'): string {
  return `${API_BASE_URL}/plot/${coin}?period=${period}`;
}

// Custom hook for organizing predictions data for visualization
export function useProcessedPredictions() {
  const { predictions, isLoading, isError, refresh } = usePredictions();
  
  const processedData = useMemo(() => {
    if (!predictions) return null;
    
    // Sort predictions by probability in descending order
    const sortedPredictions = [...predictions.predictions].sort(
      (a, b) => b.volatility_probability - a.volatility_probability
    );
    
    // Format data for charts
    const chartData = {
      labels: sortedPredictions.map(p => p.coin),
      datasets: [{
        label: 'Volatility Probability',
        data: sortedPredictions.map(p => p.volatility_probability),
        backgroundColor: sortedPredictions.map((p, i) => {
          // Highlight the most volatile coin
          if (p.coin === predictions.most_volatile_coin) return 'var(--chart-1)';
          
          // Use different colors for other coins
          const colorIndex = (i % 4) + 2; // Use chart-2 through chart-5
          return `var(--chart-${colorIndex})`;
        }),
        borderWidth: 0,
        borderRadius: 6,
      }]
    };
    
    return {
      date: predictions.prediction_date,
      mostVolatileCoin: predictions.most_volatile_coin,
      sortedPredictions,
      chartData
    };
  }, [predictions]);
  
  return {
    data: processedData,
    isLoading,
    isError,
    refresh
  };
} 