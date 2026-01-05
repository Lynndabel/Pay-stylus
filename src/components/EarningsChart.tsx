import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { EarningsData } from '../types/index';

interface EarningsChartProps {
  data?: EarningsData[];
  loading?: boolean;
}

export const EarningsChart: React.FC<EarningsChartProps> = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm sm:text-base">
          Loading earnings data...
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 text-sm sm:text-base">
            No earnings data available yet
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-sm">
            Start earning by creating plans and getting subscribers
          </p>
        </div>
      </div>
    );
  }

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2">
          <p className="text-xs sm:text-sm font-medium text-gray-900">
            {payload[0].payload.month}
          </p>
          <p className="text-sm sm:text-base font-semibold text-blue-600">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-48 sm:h-56 md:h-64 lg:h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          margin={{ 
            top: 5, 
            right: 10, 
            left: 0, 
            bottom: 5 
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f0f0f0" 
            vertical={false}
          />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            height={30}
            interval="preserveStartEnd"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            width={40}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }}
          />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ 
              fill: '#3b82f6', 
              strokeWidth: 2, 
              r: 3,
              className: "sm:r-4"
            }}
            activeDot={{ 
              r: 5, 
              stroke: '#3b82f6', 
              strokeWidth: 2, 
              fill: '#fff',
              className: "sm:r-6"
            }}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
