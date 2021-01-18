import { ItemType } from '@/types';

const todosNs = 'todos';

const { parse } = JSON;

const assertList = (value: unknown): ItemType[] => {
  try {
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
};

const getContents = <T> (namespace: string): T => {
  const value = localStorage.getItem(namespace);

  return value ? parse(value) : undefined;
};

const setContents = <T> (namespace: string, value: T): void => {
  if (typeof value === 'undefined') {
    localStorage.removeItem(namespace);
  } else {
    localStorage.setItem(namespace, JSON.stringify(value));
  }
};

export {
  getContents,
  setContents,
};

export const todos = {
  async get (): Promise<ItemType[]> {
    return assertList(getContents(todosNs));
  },

  async create (data: ItemType): Promise<ItemType> {
    const list = assertList(getContents(todosNs));

    list.push(data);

    setContents(todosNs, list);

    return data;
  },

  async save (data: ItemType): Promise<ItemType> {
    const list = assertList(getContents(todosNs));

    const index = list.findIndex((v) => v.id === data.id);

    if (index === -1) {
      throw new Error('Unable to save new item using save method');
    }

    list[index] = data;

    setContents(todosNs, list);

    return data;
  },

  async remove (data: ItemType): Promise<void> {
    const list = assertList(getContents(todosNs));

    const index = list.findIndex((v) => v.id === data.id);

    if (index === -1) {
      return;
    }

    list.splice(index, 1);

    setContents(todosNs, list);
  },
};
