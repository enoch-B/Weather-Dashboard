import { Card } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ForecastData {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

interface ForecastChartProps {
  data: ForecastData[];
}

export const ForecastChart = ({ data }: ForecastChartProps) => {
  const labels = data.map(item => {
    const date = new Date(item.date);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'High Temperature',
        data: data.map(item => item.high),
        borderColor: 'hsl(15, 100%, 60%)', // temp-hot color
        backgroundColor: 'hsla(15, 100%, 60%, 0.1)',
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'hsl(15, 100%, 60%)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        tension: 0.4,
        fill: '+1',
      },
      {
        label: 'Low Temperature',
        data: data.map(item => item.low),
        borderColor: 'hsl(200, 100%, 60%)', // temp-cool color
        backgroundColor: 'hsla(200, 100%, 60%, 0.1)',
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'hsl(200, 100%, 60%)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        tension: 0.4,
        fill: 'origin',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: 'hsl(222, 84%, 5%)',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: 'hsl(222, 84%, 5%)',
        bodyColor: 'hsl(222, 84%, 5%)',
        borderColor: 'hsl(210, 100%, 56%)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}°C`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(215, 16%, 47%)',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'hsl(214, 32%, 91%)',
          lineWidth: 1,
        },
        ticks: {
          color: 'hsl(215, 16%, 47%)',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value + '°C';
          },
        },
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <Card className="weather-card animate-slide-up">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-card-foreground">5-Day Temperature Trend</h3>
        <p className="text-muted-foreground">Daily high and low temperature forecast</p>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};