import axios from 'axios';

const serverUrl = axios.create({
  baseURL: 'https://1f6984696e7f.ngrok.io/api',
});

const registerUserEndpoint = 'https://3428b22f0f43.ngrok.io/api/register';

const loginUserEndpoint = 'https://3428b22f0f43.ngrok.io/api/login';

const jokesEndpoint = 'https://official-joke-api.appspot.com/jokes/ten';

export {serverUrl, registerUserEndpoint, loginUserEndpoint, jokesEndpoint};
