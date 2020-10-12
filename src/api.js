import axios from 'axios';

const serverUrl = axios.create({
  baseURL: 'https://1f6984696e7f.ngrok.io/api',
});

const registerUserEndpoint = 'https://af183086a13f.ngrok.io/api/register';

const loginUserEndpoint = 'https://af183086a13f.ngrok.io/api/login';

const jokesEndpoint = 'https://official-joke-api.appspot.com/jokes/ten';

export {serverUrl, registerUserEndpoint, loginUserEndpoint, jokesEndpoint};
