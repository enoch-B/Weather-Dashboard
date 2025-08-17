import { Card } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';

interface ForecastData {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

interface WeeklyForecastProps {
  data: ForecastData[];
}

export const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return <Sun className="h-8 w-8 text-sunny" />;
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="h-8 w-8 text-rainy" />;
    } else if (lowerCondition.includes('snow')) {
      return <CloudSnow className="h-8 w-8 text-primary" />;
    } else {
      return <Cloud className="h-8 w-8 text-cloudy" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'temp-hot';
    if (temp >= 25) return 'temp-warm';
    if (temp >= 15) return 'temp-mild';
    if (temp >= 5) return 'temp-cool';
    return 'temp-cold';
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  return (
    <Card className="weather-card animate-slide-up">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-card-foreground">5-Day Forecast</h3>
        <p className="text-muted-foreground">Detailed weather forecast for the upcoming days</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <div
            key={day.date}
            className={`bg-primary/5 rounded-xl p-4 hover:bg-primary/10 transition-all duration-300 hover-scale animate-bounce-in border border-primary/10`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center">
              <h4 className="font-semibold text-card-foreground mb-2">
                {getDayName(day.date)}
              </h4>
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.condition)}
              </div>
              <p className="text-sm text-muted-foreground mb-3 capitalize">
                {day.condition}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">High</span>
                  <span className={`font-bold ${getTemperatureColor(day.high)}`}>
                    {Math.round(day.high)}°
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Low</span>
                  <span className={`font-bold ${getTemperatureColor(day.low)}`}>
                    {Math.round(day.low)}°
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Humidity</span>
                  <span className="text-xs font-medium text-card-foreground">
                    {day.humidity}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Wind</span>
                  <span className="text-xs font-medium text-card-foreground">
                    {day.windSpeed} km/h
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};