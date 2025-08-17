import { Card } from '@/components/ui/card';
import { Wind, Droplets, Eye, Gauge } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  icon: string;
}

interface WeatherStatsProps {
  data: WeatherData;
}

export const WeatherStats = ({ data }: WeatherStatsProps) => {
  const stats = [
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${data.windSpeed} km/h`,
      color: 'text-primary'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${data.humidity}%`,
      color: 'text-rainy'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${data.pressure} hPa`,
      color: 'text-stormy'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${data.visibility} km`,
      color: 'text-cloudy'
    }
  ];

  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.label} 
          className={`weather-card animate-slide-up hover-scale`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gradient-sky`}>
              <stat.icon className={`h-6 w-6 text-white`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};