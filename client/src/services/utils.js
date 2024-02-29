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

