import fetch from 'isomorphic-fetch';

const serverUrl = 'https://reqres.in';

const apiFetchUser = `${serverUrl}/api/users?page=`;

export default async function fetchUserList(params) {
  try {
    const response = await fetch(apiFetchUser + params, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
