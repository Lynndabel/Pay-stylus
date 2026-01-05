import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
              {title}
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-1.5 truncate">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                {subtitle}
              </p>
            )}
            {trend && (
              <div className="flex flex-wrap items-center gap-1 mt-2">
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '↑' : '↓'} {trend.isPositive ? '+' : ''}{trend.value}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 p-2.5 sm:p-3 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg sm:rounded-xl">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
