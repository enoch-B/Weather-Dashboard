import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Thermometer, Wind, Droplets, Eye, Gauge, RefreshCw } from 'lucide-react';
import { CurrentWeather } from './weather/CurrentWeather';
import { ForecastChart } from './weather/ForecastChart';
import { WeeklyForecast } from './weather/WeeklyForecast';
import { WeatherStats } from './weather/WeatherStats';
import { useToast } from '@/hooks/use-toast';

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

interface ForecastData {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const { toast } = useToast();

  // Mock weather data for demo purposes
  const mockWeatherData: WeatherData = {
    location: 'San Francisco, CA',
    temperature: 22,
    condition: 'Partly Cloudy',
    description: 'Partly cloudy with gentle breeze',
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    icon: '02d'
  };

  const mockForecastData: ForecastData[] = [
    { date: '2024-01-27', high: 24, low: 18, condition: 'Sunny', icon: '01d', humidity: 60, windSpeed: 10 },
    { date: '2024-01-28', high: 26, low: 20, condition: 'Partly Cloudy', icon: '02d', humidity: 55, windSpeed: 15 },
    { date: '2024-01-29', high: 23, low: 17, condition: 'Cloudy', icon: '03d', humidity: 70, windSpeed: 8 },
    { date: '2024-01-30', high: 21, low: 15, condition: 'Rainy', icon: '09d', humidity: 85, windSpeed: 18 },
    { date: '2024-01-31', high: 25, low: 19, condition: 'Sunny', icon: '01d', humidity: 50, windSpeed: 12 },
  ];

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          toast({
            title: "Location detected",
            description: "Using your current location for weather data",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location access denied",
            description: "Using default location. Please enable location access for accurate weather data.",
            variant: "destructive",
          });
          // Use mock data when location is denied
          setWeatherData(mockWeatherData);
          setForecastData(mockForecastData);
          setLoading(false);
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Using default location.",
        variant: "destructive",
      });
      setWeatherData(mockWeatherData);
      setForecastData(mockForecastData);
      setLoading(false);
    }
  };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      // For demo purposes, simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, you would use actual weather API here
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=YOUR_API_KEY&units=metric`);
      
      setWeatherData(mockWeatherData);
      setForecastData(mockForecastData);
      
      toast({
        title: "Weather updated",
        description: "Successfully fetched latest weather data",
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast({
        title: "Error fetching weather",
        description: "Unable to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = () => {
    if (location) {
      fetchWeatherData();
    } else {
      getLocation();
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const getBackgroundGradient = (condition: string) => {
    if (condition.toLowerCase().includes('sunny') || condition.toLowerCase().includes('clear')) {
      return 'bg-gradient-sunset';
    } else if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm')) {
      return 'bg-gradient-storm';
    } else {
      return 'bg-gradient-sky';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sky">
        <div className="text-center">
          <RefreshCw className="mx-auto h-12 w-12 text-primary animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Weather Data</h2>
          <p className="text-white/80">Getting your location and fetching weather information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${weatherData ? getBackgroundGradient(weatherData.condition) : 'bg-gradient-sky'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">Weather Dashboard</h1>
              <p className="text-white/80">Real-time weather information</p>
            </div>
          </div>
          <Button 
            onClick={refreshWeather}
            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather - Takes up 2 columns on large screens */}
            <div className="lg:col-span-2">
              <CurrentWeather data={weatherData} />
            </div>

            {/* Weather Stats */}
            <div className="space-y-6">
              <WeatherStats data={weatherData} />
            </div>

            {/* Temperature Chart - Full width */}
            <div className="lg:col-span-3">
              <ForecastChart data={forecastData} />
            </div>

            {/* 5-Day Forecast - Full width */}
            <div className="lg:col-span-3">
              <WeeklyForecast data={forecastData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};