# Crypto Volatility Dashboard

**Note: This repository contains only the frontend codebase used for deployment on Vercel. The backend ML engineering project is available at [https://github.com/Ranjit2111/Crypto-Volatility-ML-Engineering](https://github.com/Ranjit2111/Crypto-Volatility-ML-Engineering).**

A modern, responsive frontend dashboard for the Crypto Volatility Tracker API built with Next.js and shadcn UI.

## Features

- **Real-time Volatility Predictions**: Visualize which cryptocurrencies are likely to experience the highest price movements
- **Interactive Charts**: Explore price charts for different cryptocurrencies with multiple time periods
- **Coin Universe**: Browse all cryptocurrencies being tracked with a responsive grid layout
- **Modern UI**: Dark-themed dashboard with animations, glass morphism effects, and responsive design

## Tech Stack

- **Framework**: Next.js with App Router
- **Styling**: shadcn UI + Tailwind CSS
- **Typography**: Inter for UI, JetBrains Mono for financial data
- **Charts**: Chart.js for visualizations
- **State Management**: SWR for data fetching
- **Animation**: Framer Motion for interactive animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A running instance of the Crypto Volatility Tracker API

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ranjit2111/Crypto-Volatility-Vercel.git
cd Crypto-Volatility-Vercel
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add:

```
NEXT_PUBLIC_API_URL=http://localhost:8000  # Replace with your API URL
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

To deploy this application to Vercel:

1. Push this repository to GitHub, GitLab, or Bitbucket
2. Connect to Vercel and select the repository
3. Configure the following environment variables during deployment:
   - `NEXT_PUBLIC_API_URL`: Your production API URL (e.g., https://your-api-domain.com)
4. Deploy the application

For more detailed information, see [Vercel's Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Connecting to Production API

To connect to a production API:

1. Update the `NEXT_PUBLIC_API_URL` environment variable to point to your deployed API URL
2. Make sure CORS is properly configured on your API to allow requests from your frontend domain

## Related Repositories

- **Frontend (This Repository)**: [https://github.com/Ranjit2111/Crypto-Volatility-Vercel](https://github.com/Ranjit2111/Crypto-Volatility-Vercel)
- **Backend ML Engineering**: [https://github.com/Ranjit2111/Crypto-Volatility-ML-Engineering](https://github.com/Ranjit2111/Crypto-Volatility-ML-Engineering)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
