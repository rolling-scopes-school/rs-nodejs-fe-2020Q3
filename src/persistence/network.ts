import axios from 'axios';
import { ItemType } from '@/types';

const baseURL = (process.env.VUE_APP_BASE_URL ?? `http://localhost:3000`).replace(/\/$/, '') + `/`;

interface AuthLoginResponse {
  statusCode: number;
  token?: string;
  reason?: string;
}

export const auth = {
  token: undefined,

  async login (data: { username: string; password: string }): Promise<AuthLoginResponse> {
    const response = await axios({
      baseURL,
      method: 'post',
      url: '/auth/login',
      data,
    });

    return response.data;
  },

  async register (data: { username: string; password: string; email: string; }): Promise<AuthLoginResponse> {
    const response = await axios({
      baseURL,
      method: 'post',
      url: '/auth/register',
      data,
    });

    return response.data;
  },

  async test (): Promise<{ statusCode: number }> {
    const headers = { Authorization: auth.token }

    const response = await axios({
      baseURL,
      method: 'post',
      url: '/auth/test',
      headers
    });

    return response.data;
  }
};

export const todos = {
  async get (): Promise<ItemType[]> {
    const response = await axios({
      baseURL,
      url: '/todos'
    });

    return response.data;
  },

  async create (data: ItemType): Promise<ItemType> {
    const response = await axios({
      baseURL,
      method: 'post',
      data,
      url: '/todos'
    });

    return response.data;
  },

  async save (data: ItemType): Promise<ItemType> {
    const response = await axios({
      baseURL,
      method: 'put',
      data,
      url: `/todos/${data.id}`
    });

    return response.data;
  },

  async remove (data: ItemType): Promise<void> {
    const response = await axios({
      baseURL,
      method: 'delete',
      url: `/todos/${data.id}`
    });

    return response.data;
  }
}
