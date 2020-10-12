import axios from 'axios';

const serverUrl = axios.create({
  baseURL: 'https://1f6984696e7f.ngrok.io/api'
});

const registerUserEndpoint = 'https://1f6984696e7f.ngrok.io/api/register';

export {serverUrl, registerUserEndpoint};
