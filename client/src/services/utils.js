
// format date for items
export function formatDate (dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`
}

// format date time for messages and conversations
export function formatDateTime (dateString) {
  const date = new Date(dateString);
  const hour = String(date.getHours()).padStart(2,0);
  const min = String(date.getMinutes()).padStart(2,0);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year} - ${hour}:${min}`
}

// sort data arrays by date
export function sortByDate(array, dateProperty) {
  return array.sort((a, b) => {
    let dateA = new Date(a[dateProperty]);
    let dateB = new Date(b[dateProperty]);
    return dateA - dateB;
  });
}

// helper function
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// calculate distance between two locations
export function calculateDistance (lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = degreesToRadians(lat2 - lat1);
  const dLng = degreesToRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  console.log('🦘', distance);
  return distance;
}

