import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: { price: number[] };
};

export default function CryptoDashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true'
    ).then(res => setCoins(res.data));
  }, []);

  return (
    <div>
      <h2>Top Cryptos</h2>
      {coins.map((coin) => (
        <div key={coin.id}>
          <h3>{coin.name} (${coin.current_price})</h3>
          <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={coin.sparkline_in_7d.price.map((p, i) => ({ i, p }))}>
              <Line dataKey="p" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
