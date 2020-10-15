// import axios from 'axios';

// const baseURL = axios.create({
//   serverUrl: 'https://alxtest.truhdition.com',
// });

// export const baseUrl = 'http://18.219.1.247:8080';

// const baseURL = {uri: 'https://alxtest.truhdition.com'};
// const registerUserEndpoint = `${baseURL}/api/register`;
// const loginUserEndpoint = `${baseURL}/api/login`;

const registerUserEndpoint = 'https://alxtest.truhdition.com/api/register';
const loginUserEndpoint = 'https://alxtest.truhdition.com/api/login';

// 3rd Party APIs --Jokes and Kitsu
// const jokesEndpoint = 'https://official-joke-api.appspot.com/jokes/ten';
const jokesEndpoint = 'https://alxtest.truhdition.com/api/getJokesData';
const kitsuEndpoint = 'https://alxtest.truhdition.com/api/getKitsuData';

export {registerUserEndpoint, loginUserEndpoint, jokesEndpoint,kitsuEndpoint};
