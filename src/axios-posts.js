import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com'
  baseURL: 'https://react-practice-ca22a.firebaseio.com/'
});

export default instance;