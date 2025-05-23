import { useEffect, useState } from 'react';

/**
 * A simple component that fetches and displays the user's current location (city).
 * Uses the browser's Geolocation API along with the OpenCage Data API to convert 
 * coordinates into a readable place name.
 * 
 * Code was written after studying the OpenCage documentation.
 * 
 * @author Lucas Liu 
 * @author https://opencagedata.com/
 */
export default function UserLocation() {
  // Holds the status or result of the location lookup
  const [location, setLocation] = useState('Locating...');

  // Your OpenCage API key
  const OPENCAGE_KEY = '6a70709b9f1f4954a6182aeb1f4b6165';

  // Runs on component mount to determine the user's location
  useEffect(() => {
    // Check if geolocation is supported in the browser
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported.');
      return;
    }

    // Request the user's coordinates
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        // Fetch city name using OpenCage's reverse geocoding API
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_KEY}`
        );
        const data = await response.json();
        const components = data.results[0].components;

        // Choose the most appropriate city-level label from the result
        const city =
          components.city ||
          components.town ||
          components.village ||
          components.county ||
          'Unknown location';

        // Update the state with the resolved location
        setLocation(`Current Location: ${city}`);
      } catch (err) {
        // If there's an error (e.g. network issue), show it to the user
        setLocation(`Location error: ${err.message}`);
      }
    });
  }, []);

  // Render the final location or status text
  return <p className="text-sm text-gray-600">{location}</p>;
}
