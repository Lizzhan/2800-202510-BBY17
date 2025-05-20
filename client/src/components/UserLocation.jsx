import { useEffect, useState } from 'react';

export default function UserLocation() {
  const [location, setLocation] = useState('Locating...');
  const OPENCAGE_KEY = '6a70709b9f1f4954a6182aeb1f4b6165';

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_KEY}`
        );
        const data = await response.json();
        const components = data.results[0].components;

        const city =
          components.city ||
          components.town ||
          components.village ||
          components.county ||
          'Unknown location';

        setLocation(`Current Location: ${city}`);
      } catch (err) {
        setLocation(`Location error: ${err.message}`);
      }
    });
  }, []);

  return <p className="text-sm text-gray-600">{location}</p>;
}
