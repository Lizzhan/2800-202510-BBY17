import { useEffect, useState } from 'react';

/**
 * a simple location service to display where the user is currently located. The opencage api was used to achieve this.
 * The opencage documentaiton was studied to get the code for this feature. 
 * 
 * @author Lucas Liu 
 * @author https://opencagedata.com/
 * 
 */
export default function UserLocation() {
  //set status to loading when location hasnt been fully loaded yet
  const [location, setLocation] = useState('Locating...');
  const OPENCAGE_KEY = '6a70709b9f1f4954a6182aeb1f4b6165';

  //check if the browser supports geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation('Geolocation not supported.');
      return;
    }
    //get the latitude and logitue from gelocation
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // convert the latitude and logitude to city from open cage api
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
        //set the city name to be displayed later.
        setLocation(`Current Location: ${city}`);
      } catch (err) {
        setLocation(`Location error: ${err.message}`);
      }
    });
  }, []);

  return <p className="text-sm text-gray-600">{location}</p>;
}
