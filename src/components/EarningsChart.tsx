import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { EarningsData } from '../types/index';

interface EarningsChartProps {
  data?: EarningsData[];
  loading?: boolean;
}

export const EarningsChart: React.FC<EarningsChartProps> = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading earnings data...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No earnings data available yet</p>
          <p className="text-sm text-gray-400 mt-2">Start earning by creating plans and getting subscribers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};