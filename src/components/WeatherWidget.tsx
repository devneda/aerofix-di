import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind } from "lucide-react";

interface WeatherData {
  temp: number;
  condition: string;
  wind: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=41.6561&longitude=-0.8773&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m")
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: data.current.temperature_2m,
          wind: data.current.wind_speed_10m,
          condition: data.current.weather_code <= 3 ? "Despejado" : "Nublado"
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !weather) return null;

  return (
    <div className="card" style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "16px", 
      padding: "12px 20px", 
      backgroundColor: "rgba(255,255,255,0.05)",
      border: "1px solid var(--border-color)",
      borderRadius: "12px",
      marginBottom: "20px"
    }}>
      <div style={{ backgroundColor: "var(--primary-color)", padding: "8px", borderRadius: "50%", display: "flex" }}>
        {weather.temp > 20 ? <Sun size={20} color="white" /> : <Cloud size={20} color="white" />}
      </div>
      <div>
        <h4 style={{ margin: 0, fontSize: "0.9rem" }}>Clima en Hangar (Zaragoza)</h4>
        <div style={{ display: "flex", gap: "12px", fontSize: "0.8rem", color: "var(--feedback-text)", marginTop: "4px" }}>
          <span>{weather.temp}°C</span>
          <span>{weather.condition}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Wind size={12} /> {weather.wind} km/h</span>
        </div>
      </div>
    </div>
  );
}
