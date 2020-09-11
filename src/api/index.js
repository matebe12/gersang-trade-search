import axios from 'axios';
import { setInterceptors } from './interceptor';

function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `https://api.gerinee.com/common/${url}`,
  });
  return setInterceptors(instance);
}

export const trade = createInstanceWithAuth('trade');
