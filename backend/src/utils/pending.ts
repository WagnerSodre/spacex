type PendingMap = {
  [key: string]: Promise<any>;
};

const pendingRequests: PendingMap = {};

export async function withPending<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (await pendingRequests[key]) return pendingRequests[key];

  const promise = fn().finally(() => {
    delete pendingRequests[key]; // limpa após terminar
  });

  pendingRequests[key] = promise;
  return promise;
}