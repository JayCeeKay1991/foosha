const rootUrl = `${import.meta.env.VITE_SERVER || 'http://localhost:3000'}/messages`;

export async function getAllMessages () {
  try   {
    const response = await fetch(rootUrl, {
    method: 'GET'
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};

export async function postMessage (body) {
  try {
    const response = await fetch(rootUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};
