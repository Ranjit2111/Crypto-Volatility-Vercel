'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHealthCheck, useCoins, usePredictions } from '@/lib/api';

export function ApiDebugger() {
  const [showDebugger, setShowDebugger] = useState(false);
  const [manualTestResult, setManualTestResult] = useState<any>(null);
  const [manualTestError, setManualTestError] = useState<string | null>(null);
  const { isHealthy, isLoading: healthLoading, isError: healthError } = useHealthCheck();
  const { coins, isLoading: coinsLoading, isError: coinsError } = useCoins();
  const { predictions, isLoading: predictionsLoading, isError: predictionsError } = usePredictions();

  const runManualTest = async () => {
    setManualTestResult(null);
    setManualTestError(null);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      console.log('Testing API connection to:', apiUrl);
      
      const response = await fetch(`${apiUrl}/`);
      const data = await response.json();
      setManualTestResult(data);
    } catch (error) {
      console.error('Manual API test failed:', error);
      setManualTestError(error instanceof Error ? error.message : String(error));
    }
  };

  useEffect(() => {
    // Log environment variable on mount
    console.log('API URL from env:', process.env.NEXT_PUBLIC_API_URL);
  }, []);

  if (!showDebugger) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setShowDebugger(true)}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          Debug API
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[90vw]">
      <Card className="border-yellow-600">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">API Connection Debugger</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDebugger(false)}
              className="h-6 w-6 p-0"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-xs pt-0">
          <div>
            <p className="font-semibold">API URL:</p>
            <p className="font-mono bg-secondary/30 p-1 rounded overflow-x-auto">
              {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="border rounded p-2">
              <p className="font-semibold">Health:</p>
              <p>
                {healthLoading ? '⏳' : isHealthy ? '✅' : '❌'}
                {healthError && ' Error'}
              </p>
            </div>
            <div className="border rounded p-2">
              <p className="font-semibold">Coins:</p>
              <p>
                {coinsLoading ? '⏳' : (coins && coins.length > 0) ? '✅' : '❌'}
                {coinsError && ' Error'}
              </p>
            </div>
            <div className="border rounded p-2">
              <p className="font-semibold">Predictions:</p>
              <p>
                {predictionsLoading ? '⏳' : predictions ? '✅' : '❌'}
                {predictionsError && ' Error'}
              </p>
            </div>
          </div>
          
          <div>
            <Button onClick={runManualTest} size="sm" variant="outline" className="w-full">
              Run Manual Test
            </Button>
            
            {manualTestError && (
              <div className="mt-2 bg-red-900/20 border border-red-700 p-2 rounded text-red-500 overflow-x-auto">
                <p className="font-semibold">Error:</p>
                <p className="font-mono whitespace-pre-wrap">{manualTestError}</p>
              </div>
            )}
            
            {manualTestResult && (
              <div className="mt-2 bg-green-900/20 border border-green-700 p-2 rounded overflow-x-auto">
                <p className="font-semibold">Result:</p>
                <pre className="font-mono text-xs whitespace-pre-wrap">
                  {JSON.stringify(manualTestResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 