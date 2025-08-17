import { Card } from '@/components/ui/card';
import { MapPin, Thermometer } from 'lucide-react';

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

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'temp-hot';
    if (temp >= 25) return 'temp-warm';
    if (temp >= 15) return 'temp-mild';
    if (temp >= 5) return 'temp-cool';
    return 'temp-cold';
  };

  return (
    <Card className="weather-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-card-foreground">{data.location}</h2>
          </div>
          
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className={`text-6xl font-bold ${getTemperatureColor(data.temperature)}`}>
                {Math.round(data.temperature)}°
              </span>
              <span className="text-2xl text-muted-foreground">C</span>
            </div>
            <p className="text-xl font-medium text-card-foreground mt-1">{data.condition}</p>
            <p className="text-muted-foreground">{data.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-primary/10 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Feels like</p>
              <p className={`text-lg font-semibold ${getTemperatureColor(data.temperature + 2)}`}>
                {Math.round(data.temperature + 2)}°C
              </p>
            </div>
            <div className="bg-primary/10 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">UV Index</p>
              <p className="text-lg font-semibold text-card-foreground">{data.uvIndex}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="w-24 h-24 bg-gradient-sky rounded-full flex items-center justify-center mb-4">
            <Thermometer className="h-12 w-12 text-white" />
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last updated</p>
            <p className="text-sm font-medium text-card-foreground">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};