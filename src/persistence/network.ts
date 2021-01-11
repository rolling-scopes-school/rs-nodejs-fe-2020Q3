import axios from 'axios';
import { ItemType } from '@/types';

const route = 'todos'
const baseURL = (process.env.VUE_APP_BASE_URL ?? `http://localhost:3000`).replace(/\/$/, '') + `/${route}`;

export default {
  async get (): Promise<ItemType[]> {
    const response = await axios({
      baseURL,
      url: '/'
    });

    return response.data;
  },

  async create (data: ItemType): Promise<ItemType> {
    const response = await axios({
      baseURL,
      method: 'post',
      data,
      url: '/'
    });

    return response.data;
  },

  async save (data: ItemType): Promise<ItemType> {
    const response = await axios({
      baseURL,
      method: 'put',
      data,
      url: `/${data.id}`
    });

    return response.data;
  },

  async remove (data: ItemType): Promise<void> {
    const response = await axios({
      baseURL,
      method: 'delete',
      url: `/${data.id}`
    });

    return response.data;
  }
}
