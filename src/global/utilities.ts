import {RawAxiosRequestHeaders} from 'axios';
import {getToken} from '../services/storage';

export function getAuthHeaders(): RawAxiosRequestHeaders {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}
