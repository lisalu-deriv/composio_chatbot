// Weather tool function
async function getWeatherFunction({ latitude, longitude }: { latitude: number; longitude: number }): Promise<string> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const weatherData = await response.json();
    
    // Format the response for better readability
    const current = weatherData.current;
    const daily = weatherData.daily;
    
    return JSON.stringify({
      location: {
        latitude,
        longitude,
        timezone: weatherData.timezone,
      },
      current: {
        temperature: `${current.temperature_2m}°C`,
        time: current.time,
      },
      today: {
        sunrise: daily.sunrise[0],
        sunset: daily.sunset[0],
      },
      raw_data: weatherData,
    }, null, 2);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return `Error fetching weather data: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

import { z } from 'zod';

// Zod schema for weather parameters
export const weatherParamsSchema = z.object({
  latitude: z.number()
    .describe('The latitude coordinate in decimal degrees format (-90 to 90)'),
  longitude: z.number()
    .describe('The longitude coordinate in decimal degrees format (-180 to 180)')
}).describe('Parameters for getting weather data');

// LangChain-compatible tool with Zod schema
export const getWeatherTool = {
  name: 'get_weather' as const,
  description: 'Get the current weather at a location using latitude and longitude coordinates',
  parameters: weatherParamsSchema,
  function: getWeatherFunction,
};

// Export the tool for backward compatibility
export const getWeather = getWeatherTool;
