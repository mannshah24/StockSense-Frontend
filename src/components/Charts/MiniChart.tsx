import React from 'react';

interface MiniChartProps {
  data: Array<{ time: string; price: number }>;
  isPositive: boolean;
}

export const MiniChart: React.FC<MiniChartProps> = ({ data, isPositive }) => {
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  const points = data.map((d, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((maxPrice - d.price) / priceRange) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-16 w-full">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={isPositive ? 'hsl(var(--profit))' : 'hsl(var(--loss))'}
          strokeWidth="2"
          points={points}
          className="smooth-transition"
        />
        <defs>
          <linearGradient id={`gradient-${isPositive ? 'profit' : 'loss'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: isPositive ? 'hsl(var(--profit))' : 'hsl(var(--loss))', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: isPositive ? 'hsl(var(--profit))' : 'hsl(var(--loss))', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <polygon
          fill={`url(#gradient-${isPositive ? 'profit' : 'loss'})`}
          points={`0,100 ${points} 100,100`}
        />
      </svg>
    </div>
  );
};