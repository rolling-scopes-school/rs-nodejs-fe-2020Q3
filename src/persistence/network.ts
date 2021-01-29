import axiosLib from 'axios';
import { ItemType } from '@/types';
import { getContents, setContents } from '@/persistence/localStorage';
import { baseURL } from '@/constants';

const axios = axiosLib.create({
  validateStatus: function (status) {
    return status >= 200 && status < 600;
  },
});

interface AuthLoginResponse {
  statusCode: number;
  token?: string;
  reason?: string;
}

export const auth = {
  token: getContents<string>('token'),

  setToken (value?: string) {
    auth.token = value;
    setContents<string>('token', value);
  },

  getAuthHeaders () {
    return auth.token
      ? { Authorization: auth.token }
      : {};
  },

  async login (data: { username: string; password: string }): Promise<AuthLoginResponse> {
    const response = await axios({
      baseURL,
      method: 'post',
      url: '/auth/login',
      data,
    });

    auth.setToken(response.data.token);

    return response.data;
  },

  async register (data: { username: string; password: string; email: string; }): Promise<AuthLoginResponse> {
    const response = await axios({
      baseURL,
      method: 'post',
      url: '/auth/register',
      data,
    });

    auth.setToken(response.data.token);

    return response.data;
  },

  async test (): Promise<{ statusCode: number }> {
    const headers = auth.getAuthHeaders();

    const response = await axios({
      baseURL,
      method: 'post',
      url: '/auth/test',
      headers,
    });

    return response.data;
  },
};

export const todos = {
  async get (): Promise<ItemType[]> {
    const headers = auth.getAuthHeaders();

    const response = await axios({
      baseURL,
      url: '/todos',
      headers,
    });

    return response.data;
  },

  async create (data: ItemType): Promise<ItemType> {
    const headers = auth.getAuthHeaders();

    const response = await axios({
      baseURL,
      method: 'post',
      data,
      url: '/todos',
      headers,
    });

    return response.data;
  },

  async save (data: ItemType): Promise<ItemType> {
    const headers = auth.getAuthHeaders();

    const response = await axios({
      baseURL,
      method: 'put',
      data,
      url: `/todos/${data.id}`,
      headers,
    });

    return response.data;
  },

  async remove (data: ItemType): Promise<void> {
    const headers = auth.getAuthHeaders();

    const response = await axios({
      baseURL,
      method: 'delete',
      url: `/todos/${data.id}`,
      headers,
    });

    return response.data;
  },
};
