export function formatDate (dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`
}

export function formatDateTime (dateString) {
  const date = new Date(dateString);
  const hour = String(date.getHours()).padStart(2,0);
  const min = String(date.getMinutes()).padStart(2,0);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year} - ${hour}:${min}`
}

export async function formatLocation (lat, lng) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAhwWL2yznZEWAZ2e63UdXRDej2wFJBf44`; //fixme: store key securely
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      console.error("No results found");
      return 'No location found';
    }
  } catch (error) {
    console.error("Geocode error:", error);
    return 'No location found';
  }
}