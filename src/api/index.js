import axios from 'axios';
import { setInterceptors } from './interceptor';

function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `https://api.gerinee.com/${url}`,
  });
  return setInterceptors(instance);
}

export const trade = createInstanceWithAuth('common/trade');
export const satong = createInstanceWithAuth('megaphone/v2');
