import { v4 } from 'uuid';
import { ItemType } from '@/types';
import { auth } from '@/persistence/network';
import { baseURL } from '@/constants';

const wsUrl = baseURL.replace(/^http(s)?/, 'ws$1');

const defer = () => {
  let resolve;
  let reject;
  const promise = new Promise((...args) => {
    [resolve, reject] = args;
  });

  return {
    promise,
    resolve,
    reject,
  };
};

const socket = new WebSocket(`${wsUrl}/ws/`);

export const todos = {
  async get (): Promise<ItemType[]> {
    return sendMessage({ type: 'listAll' }) as Promise<ItemType[]>;
  },

  async create (data: ItemType): Promise<ItemType> {
    return sendMessage({ type: 'create', data }) as Promise<ItemType>;
  },

  async save (data: ItemType): Promise<ItemType> {
    return sendMessage({ type: 'update', data }) as Promise<ItemType>;
  },

  async remove (data: ItemType): Promise<void> {
    const { id } = data;

    await sendMessage({ type: 'remove', data: { id } });
  },
};

const sendMessage = async (message: unknown) => {
  await socketDefer.promise;

  const id = v4();

  const def = defer();

  messageMap[id] = def;

  socket.send(
    JSON.stringify({
      auth: auth.token,
      id,
      ...(message as any),
    }),
  );

  return def.promise;
};

const socketDefer = defer();

const messageMap: Record<string, typeof socketDefer> = {};

socket.addEventListener('open', async () => {
  socketDefer.resolve(socket);
});

socket.addEventListener('message', function (event) {
  const { id, ...message } = JSON.parse(event.data);

  if (messageMap[id]) {
    messageMap[id].resolve(message.data);

    delete messageMap[id];
  }
});

