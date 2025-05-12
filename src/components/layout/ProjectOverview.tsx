'use client'

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Database, Server, Layout, Cpu, LineChart, BriefcaseBusiness } from "lucide-react";

// Define technology stacks
const technologyStacks = [
  {
    id: "frontend",
    name: "Frontend",
    icon: <Layout className="h-5 w-5 text-primary" />,
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "SWR", "Chart.js", "Framer Motion"]
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Server className="h-5 w-5 text-primary" />,
    technologies: ["FastAPI", "Nginx", "HTTPS", "CORS"]
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: <Cpu className="h-5 w-5 text-primary" />,
    technologies: ["XGBoost", "Feature Engineering", "Hyperparameter Tuning", "Time-Series Cross-Validation"]
  },
  {
    id: "devops",
    name: "DevOps",
    icon: <BriefcaseBusiness className="h-5 w-5 text-primary" />,
    technologies: ["Docker", "Containerization", "CI/CD", "AWS EC2/Vercel Deployment"]
  },
  {
    id: "data",
    name: "Data Pipeline",
    icon: <Database className="h-5 w-5 text-primary" />,
    technologies: ["Data Acquisition", "Preprocessing", "Feature Engineering", "Model Training"]
  },
  {
    id: "visualization",
    name: "Data Visualization",
    icon: <LineChart className="h-5 w-5 text-primary" />,
    technologies: ["Interactive Charts", "Feature Importance", "OHLC Price Plots", "Performance Metrics"]
  }
];

export function ProjectOverview() {
  return (
    <div className="space-y-8">
      <Card className="glass-card overflow-hidden border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold mb-4">About This Project</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  The Crypto Volatility Watcher is a full-stack machine learning application designed to predict 
                  daily cryptocurrency volatility using advanced ML techniques. The system analyzes historical data
                  and uses a carefully tuned XGBoost model to forecast which cryptocurrency is most likely to
                  experience significant price movements in the next 24 hours.
                </p>
                <p>
                  This project demonstrates an end-to-end MLOps workflow, from data ingestion and feature engineering to
                  model tuning, prediction, and API deployment. The frontend visualizes these predictions and
                  provides insights into the model's decision-making process.
                </p>
                <p>
                  Built with modern web technologies and ML best practices, this application showcases the
                  integration of data science with robust web development to create a practical, user-friendly
                  cryptocurrency analysis tool.
                </p>
              </div>
            </div>
            
            <div className="md:w-1/3 mt-4 md:mt-0">
              <Card className="bg-secondary/20 border-border/40">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    Key Project Achievements
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Containerized, HTTPS-secured, deployed ML application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>32% ML accuracy improvement through feature engineering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Scalable FastAPI backend with efficient data pipeline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Responsive Next.js frontend with interactive visualizations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Real-world deployment with debugging and performance optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {technologyStacks.map((stack, index) => (
          <motion.div
            key={stack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <Card className="glass-card h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {stack.icon}
                  <h3 className="font-semibold">{stack.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-secondary/30 text-xs rounded-md border border-border/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 