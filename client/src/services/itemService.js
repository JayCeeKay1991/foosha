const rootUrl = 'http://localhost:3000/items';
const cloudinaryCloudname = import.meta.env.VITE_CLOUDINARY_CONFIG.cloud_name;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;


// post an item to list
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


// post the image of an item or user to cloudinary
export async function postImageToCloudinary (body) {
  try {
    const response = await fetch(cloudinaryUrl, {
    method: 'POST',
    body: body,
  })
  const data = await response.json();
  return data.secure_url;
  } catch (error) {
    console.log(error);
}};

// get all items from database
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

// get only one item from db by id
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


// edit an item in db
export async function editItem (id, body) {
  try   {
    const response = await fetch(`${rootUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};

// delete an item from db
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