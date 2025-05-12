'use client'

import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, Code } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Creator section with animation */}
          <motion.div
            className="flex items-center gap-2 bg-secondary/30 px-5 py-3 rounded-full border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Code className="h-4 w-4 text-primary mr-1" />
            <span className="font-medium text-foreground">Designed & Developed by</span>
            <Code className="h-4 w-4 text-primary mr-1" />
          </motion.div>
          
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="https://www.linkedin.com/in/ranjit-n/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary/30 hover:bg-primary/20 border border-border/40 hover:border-primary/50 transition-all duration-300"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Link>
            
            <Link 
              href="https://github.com/Ranjit2111/Crypto-Volatility-ML-Engineering" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary/30 hover:bg-primary/20 border border-border/40 hover:border-primary/50 transition-all duration-300"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Link>
          </motion.div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Crypto Volatility Watcher &copy; {currentYear}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with Next.js, FastAPI, and XGBoost
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 