const rootUrl = 'http://localhost:3000/user';

// create new user (signup)
export async function createUser (body) {
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


// log in existing user
export async function login (body) {
  try   {
    const response = await fetch(`${rootUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(body)
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};


// getting one user by id from db
export async function getUserById (id) {
  try   {
    const response = await fetch(`${rootUrl}/${id}`, {
    method: 'GET'
  })
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
}};


// updating user in db
export async function updateUser (id, body) {
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