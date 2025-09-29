import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import './CryptoDashboard.css';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: { price: number[] };
  image: string;
  market_cap: number;
  total_volume: number;
};

export default function CryptoDashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true'
      )
      .then(res => setCoins(res.data));
  }, []);

  // Convert sparkline into {date, price} with hourly timestamps (string format for TypeScript safety)
  const formatSparkline = (prices: number[]) => {
    const now = new Date();
    return prices.map((price, i) => {
      const date = new Date(
        now.getTime() - (prices.length - 1 - i) * 60 * 60 * 1000
      ).toISOString(); // convert to string
      return { date, price };
    });
  };

  const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`;
  return `$${num}`;
};

  return (
    <div className="crypto-dashboard">
    <h2>Top 5 Cryptos – {new Date(Date.now() - 7*24*60*60*1000).toLocaleDateString()} to {new Date().toLocaleDateString()}</h2>
      {coins.map((coin) => {
        const chartData = formatSparkline(coin.sparkline_in_7d.price);
        // Pick 7 evenly spaced ticks (one per day)
        const xTicks = chartData.filter((_, i) => i % 24 === 0).map(d => d.date);

        return (
          <div key={coin.id} className="crypto-card">
            <div className="crypto-header">
              <h3>
                <img
                  src={coin.image}           // CoinGecko image URL
                  alt={coin.name}
                  className="coin-logo"
                />
                {coin.name} ({coin.symbol.toUpperCase()})
              </h3>
              <p>
                ${coin.current_price.toLocaleString()} &nbsp;|&nbsp; 
                <span
                  style={{
                    color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red',
                  }}
                >
                  {coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart 
                data={chartData}
                margin={{ top: 25, right: 35, left: 25, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  ticks={xTicks}
                  tickFormatter={(tick) =>
                    new Date(tick).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                  interval={0}
                  minTickGap={35}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={
                    coin.symbol === 'usdt'
                      ? [0.9999, 1.0001] // tiny buffer for Tether
                      : ['auto', 'auto']  // default for other coins
                  }
                  allowDecimals={true}
                  tickFormatter={(tick) =>
                    `$${tick.toLocaleString(undefined, { maximumFractionDigits: 4 })}`
                  }
                  width={95}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  labelFormatter={(time) =>
                    new Date(time).toLocaleString(undefined, {
                      weekday: 'short',
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  }
                  formatter={(val: number) => [`$${val.toFixed(2)}`, 'Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="crypto-stats">
              <p>Market Cap: {formatLargeNumber(coin.market_cap)}</p>
              <p>24h Volume: {formatLargeNumber(coin.total_volume)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}