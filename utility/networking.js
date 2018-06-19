import axios from 'axios';

const serverUrl = 'https://reqres.in';

const apiFetchUser = `${serverUrl}/api/users?page=`;

export default function fetchUserList(params) {
  try {
    axios.get(apiFetchUser + params)
      .then(response => response)
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
  return {};
}
