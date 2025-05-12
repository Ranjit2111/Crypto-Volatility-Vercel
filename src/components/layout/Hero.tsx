'use client'

import { useProcessedPredictions } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ChevronDown, Sparkles, BarChart, Activity, Code } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define types for the styles of animated particles
interface AnimatedStyle {
  top?: string;
  left?: string;
  right?: string;
  opacity?: number;
  height?: string;
  width?: string;
  transformOrigin?: string;
  transform?: string;
  background?: string;
}

export function Hero() {
  const { data } = useProcessedPredictions();
  const [priceDirection, setPriceDirection] = useState<'up' | 'down' | null>(null);

  // State for client-side generated styles
  const [waveStyles, setWaveStyles] = useState<AnimatedStyle[]>([]);
  const [nodeStyles, setNodeStyles] = useState<AnimatedStyle[]>([]);
  const [lineStyles, setLineStyles] = useState<AnimatedStyle[]>([]);
  const [orbStyles, setOrbStyles] = useState<AnimatedStyle[]>([]);

  useEffect(() => {
    // Generate styles only on the client-side
    setPriceDirection(data?.mostVolatileCoin ? (Math.random() > 0.5 ? 'up' : 'down') : null);

    setWaveStyles(
      [...Array(20)].map(() => ({
        top: `${5 + Math.random() * 90}%`,
        left: "0px",
        right: "0px",
        opacity: 0.5 + Math.random() * 0.5,
        height: `${1 + Math.random() * 2}px`,
      }))
    );

    setNodeStyles(
      [...Array(15)].map(() => ({
        width: `${3 + Math.random() * 8}px`,
        height: `${3 + Math.random() * 8}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }))
    );

    setLineStyles(
      [...Array(10)].map(() => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = startX + (Math.random() * 40 - 20);
        const endY = startY + (Math.random() * 40 - 20);
        return {
          height: '1px',
          width: '100px',
          top: `${startY}%`,
          left: `${startX}%`,
          transformOrigin: 'left center',
          transform: `rotate(${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)}deg)`,
        };
      })
    );

    setOrbStyles(
      [...Array(3)].map((_, i) => ({
        background: i % 2 === 0 
          ? 'radial-gradient(circle, rgba(0, 179, 255, 0.4) 0%, rgba(0, 179, 255, 0) 70%)' 
          : 'radial-gradient(circle, rgba(179, 32, 255, 0.4) 0%, rgba(179, 32, 255, 0) 70%)',
        width: `${200 + Math.random() * 300}px`,
        height: `${200 + Math.random() * 300}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: 'translate(-50%, -50%)',
      }))
    );
  }, [data]); // Regenerate priceDirection if data changes
  
  return (
    <div className="relative overflow-hidden py-20 md:py-28">
      {/* Enhanced abstract background with animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-10" />
        
        {/* Enhanced blockchain visualization */}
        <div className="absolute inset-0 opacity-30">
          {/* Horizontal price waves */}
          {waveStyles.map((style, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              style={style}
              animate={{
                scaleX: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.7, 0.3],
                x: ["-10%", "10%", "-10%"],
              }}
              transition={{
                duration: 15 + Math.random() * 20, // Animation properties can still use Math.random if not affecting initial style
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Network nodes */}
          {nodeStyles.map((style, i) => (
            <motion.div
              key={`node-${i}`}
              className="absolute rounded-full bg-accent"
              style={style}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.7, 0.1],
                boxShadow: [
                  '0 0 0 rgba(0, 255, 157, 0)',
                  '0 0 10px rgba(0, 255, 157, 0.5)',
                  '0 0 0 rgba(0, 255, 157, 0)',
                ],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Connection lines between nodes */}
          {lineStyles.map((style, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-ring/30"
              style={style}
              animate={{
                opacity: [0, 0.5, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Animated gradient orbs */}
          {orbStyles.map((style, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full opacity-20 blur-xl"
              style={style}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent text-5xl md:text-6xl font-bold tracking-tight drop-shadow-sm">
              Crypto Volatility Watcher
            </h1>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Predict which cryptocurrency is most likely to experience the highest 
            absolute price movement tomorrow using advanced ML algorithms.
          </motion.p>
          
          {data?.mostVolatileCoin && (
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="gradient-border-animated inline-block rounded-xl overflow-hidden">
                <div className="glass-card px-8 py-6 backdrop-blur-md bg-card/30">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Most volatile for {data.date}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <h2 className="text-3xl md:text-4xl font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold tracking-tight">
                      {data.mostVolatileCoin.toUpperCase()}
                    </h2>
                    {priceDirection === 'up' ? (
                      <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <TrendingUp className="h-7 w-7 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: [2, -2, 2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <TrendingDown className="h-7 w-7 text-red-500" />
                      </motion.div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-center">
                    <div className="bg-card/50 rounded-full px-4 py-1.5 backdrop-blur-md">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Probability:</span>{" "}
                        <span className="font-mono font-semibold text-primary">
                          {(() => {
                            const prediction = data.sortedPredictions.find(p => p.coin === data.mostVolatileCoin);
                            return prediction ? `${(prediction.volatility_probability * 100).toFixed(2)}%` : 'N/A';
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row justify-center gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="#predictions">
              <Button className="glow-effect bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium tracking-wide">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Predictions
              </Button>
            </Link>
            <Link href="#coins">
              <Button 
                variant="outline" 
                className="border-primary/40 hover:border-primary/80 hover:bg-primary/10 px-8 py-6 text-lg font-medium tracking-wide transition-all duration-200"
              >
                Explore All Coins
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Link href="#model-evolution" className="text-muted-foreground hover:text-foreground transition-colors">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary/20"
              >
                <BarChart className="h-4 w-4" />
                <span>Model Evolution</span>
              </Button>
            </Link>
            <Link href="#feature-engineering" className="text-muted-foreground hover:text-foreground transition-colors">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary/20"
              >
                <Activity className="h-4 w-4" />
                <span>Feature Engineering</span>
              </Button>
            </Link>
            <Link href="#project-overview" className="text-muted-foreground hover:text-foreground transition-colors">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary/20"
              >
                <Code className="h-4 w-4" />
                <span>Project Overview</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <Link href="#predictions" className="text-muted-foreground hover:text-foreground transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut" 
                }}
                className="flex flex-col items-center justify-center bg-secondary/20 px-6 py-3 rounded-full backdrop-blur-sm border border-border/30 hover:border-primary/40 transition-all duration-300"
              >
                <span className="text-sm mb-2">Scroll to explore all sections</span>
                <ChevronDown className="h-6 w-6 text-primary" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 