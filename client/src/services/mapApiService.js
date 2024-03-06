const mapsApiKey = import.meta.env.VITE_MAPS_API_KEY;

// Berlin as a fallback
export const defaultLocation = {
  lat: 52.507389,
  lng: 13.378096
}

export function fetchUserLocation(setLocation) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        // if location can't be found
        console.error("Error getting location: ", error);
        setLocation(defaultLocation);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    setLocation(defaultLocation);
  }
}

export async function formatLocation (lat, lng) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${mapsApiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.results.length > 0) return data.results[0].formatted_address;
    else {
      console.error("No results found");
      return 'No location found';
    }
  } catch (error) {
    console.error("Geocode error:", error);
    return 'No location found';
  }
}