const rootUrl = 'http://localhost:3000/items';


export async function postItem (body) {
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


export async function getAllItems () {
  try   {
    const response = await fetch(rootUrl, {
    method: 'GET'
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};


export async function getItemById (id) {
  try   {
    const response = await fetch(`${rootUrl}/${id}`, {
    method: 'GET'
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};


export async function getItemByOwner (id) {
  try   {
    const response = await fetch(`${rootUrl}/mine/${id}`, {
    method: 'GET'
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};


export async function editItem (id, body) {
  try   {
    const response = await fetch(`${rootUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};


export async function deleteItem (id) {
  try {
    const response = await fetch(`${rootUrl}/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response;
  } catch (error) {
    console.log(error);
  }
}