import { useState, useEffect } from "react";
import { MapPin, Thermometer } from "lucide-react";

interface TimeDisplayProps {
  className?: string;
  showLocation?: boolean;
  showTemperature?: boolean;
  timeFormat?: '12h' | '24h';
}

export const TimeDisplay = ({ 
  className = "",
  showLocation = true,
  showTemperature = true,
  timeFormat = '12h'
}: TimeDisplayProps) => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [city, setCity] = useState<string>("San Francisco");
  const [temperature, setTemperature] = useState<string>("22°");
  const [temperatureValue, setTemperatureValue] = useState<number | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [isEditingCity, setIsEditingCity] = useState<boolean>(false);
  const [tempCity, setTempCity] = useState<string>("");

  // Format time based on preference
  const formatTime = (date: Date) => {
    if (timeFormat === '24h') {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    }
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Update time every second
  useEffect(() => {
    const now = new Date();
    setTime(formatTime(now));
    setDate(formatDate(now));
    
    const timeInterval = setInterval(() => {
      const current = new Date();
      setTime(formatTime(current));
      setDate(formatDate(current));
    }, 1000);
    
    return () => clearInterval(timeInterval);
  }, [timeFormat]);

  // Initialize location and temperature
  useEffect(() => {
    // Use timezone to guess location
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let cityFromTimezone = timezone.split('/').pop()?.replace(/_/g, ' ') || "Your City";
      
      // Clean up the city name
      if (cityFromTimezone.includes('/')) {
        cityFromTimezone = cityFromTimezone.split('/').pop() || "Your City";
      }
      
      setCity(cityFromTimezone);
      setTempCity(cityFromTimezone);
    } catch (err) {
      setCity("San Francisco");
      setTempCity("San Francisco");
    }
    
    // Generate realistic temperature based on season
    const month = new Date().getMonth();
    const isSummer = (month >= 4 && month <= 9); // May to October
    const baseTemp = isSummer ? 24 : 12;
    const variation = Math.random() * 8 - 4; // ±4 degrees
    const mockTemp = Math.round(baseTemp + variation);
    
    setTemperatureValue(mockTemp);
    setTemperature(`${mockTemp}°${unit}`);
  }, []);

  // Update temperature display when unit changes
  useEffect(() => {
    if (temperatureValue !== null) {
      if (unit === 'F') {
        const fahrenheit = Math.round(temperatureValue * 9/5 + 32);
        setTemperature(`${fahrenheit}°F`);
      } else {
        setTemperature(`${temperatureValue}°C`);
      }
    }
  }, [temperatureValue, unit]);

  // Toggle temperature unit
  const toggleTemperatureUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  // Handle city editing
  const handleSubmitCity = () => {
    if (tempCity.trim()) {
      setCity(tempCity.trim());
    } else {
      setTempCity(city);
    }
    setIsEditingCity(false);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempCity(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitCity();
    } else if (e.key === 'Escape') {
      setIsEditingCity(false);
      setTempCity(city);
    }
  };

  return (
    <div className={`flex flex-col items-center text-center space-y-4 ${className}`}>
      {/* Main Time Display */}
      <div className="space-y-2">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight">
          {time}
        </h1>
        <p className="text-lg sm:text-xl text-white/80 font-medium">
          {date}
        </p>
      </div>

      {/* Location and Temperature */}
      {(showLocation || showTemperature) && (
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          {/* Location */}
          {showLocation && (
            <div className="flex items-center gap-2 group">
              <MapPin className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-200" />
              {isEditingCity ? (
                <input
                  type="text"
                  value={tempCity}
                  onChange={handleCityChange}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSubmitCity}
                  autoFocus
                  className="bg-white/10 backdrop-blur-md text-white text-center px-3 py-1 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-all duration-200"
                  placeholder="Enter your city"
                />
              ) : (
                <button
                  onClick={() => setIsEditingCity(true)}
                  className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:underline underline-offset-4"
                  title="Click to edit location"
                >
                  {city}
                </button>
              )}
            </div>
          )}

          {/* Temperature */}
          {showTemperature && (
            <div className="flex items-center gap-2 group">
              <Thermometer className="h-5 w-5 text-white/70 group-hover:text-white transition-colors duration-200" />
              <button
                onClick={toggleTemperatureUnit}
                className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:underline underline-offset-4"
                title="Click to toggle between °C and °F"
              >
                {temperature}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};