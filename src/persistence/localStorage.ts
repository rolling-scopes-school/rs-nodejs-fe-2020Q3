import { ItemType } from '@/types';

const todos = 'todos';

const parseList = (string: string): ItemType[] => {
  try {
    const value = JSON.parse(string);

    if (!Array.isArray(value)) {
      // noinspection ExceptionCaughtLocallyJS
      throw new TypeError('"todos" property contains non-array value');
    }

    return value;
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }

    console.warn(`There was error when parsing "todos" property: ${e.message}`);
  }

  return [];
}

const getContents = (): ItemType[] => {
  const todoListString = localStorage.getItem(todos);

  return parseList(todoListString);
}

const setContents = (items: ItemType[]): void => {
  localStorage.setItem(todos, JSON.stringify(items));
}

export default {
  async get (): Promise<ItemType[]> {
    return getContents();
  },

  async create (data: ItemType): Promise<ItemType> {
    const list = getContents();

    list.push(data);

    setContents(list);

    return data;
  },

  async save (data: ItemType): Promise<ItemType> {
    const list = getContents();

    const index = list.findIndex((v) => v.id === data.id);

    if (index === -1) {
      throw new Error('Unable to save new item using save method');
    }

    list[index] = data;

    setContents(list);

    return data;
  },

  async remove (data: ItemType): Promise<void> {
    const list = getContents();

    const index = list.findIndex((v) => v.id === data.id);

    if (index === -1) {
      return;
    }

    list.splice(index, 1);

    setContents(list);
  }
}
