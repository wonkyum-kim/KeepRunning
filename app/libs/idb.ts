const DB_NAME = 'keep-running';
const STORE_NAMES = ['mileage', 'calHeat'];

function openIndexedDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const idb = window.indexedDB;

    const request = idb.open(DB_NAME, 1);

    request.onerror = () => {
      reject(false);
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      STORE_NAMES.forEach((s) => {
        if (!db.objectStoreNames.contains(s)) {
          db.createObjectStore(s, {
            keyPath: 'id',
          });
        }
      });
    };
  });
}

export async function addDataToIndexedDB<T>(
  STORE_NAME: string,
  data: T
): Promise<boolean> {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.put(data);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      reject(new Error('idb error'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function editDataFromIndexedDB<T>(
  STORE_NAME: string,
  data: Partial<T>,
  key: string
): Promise<boolean> {
  const db = await openIndexedDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);

    const getRequest = objectStore.get(key);

    getRequest.onsuccess = () => {
      // 이전 데이터를 가져온다.
      const oldData = getRequest.result as T;
      // 수정된 데이터를 만든다.
      const newData = { ...oldData, ...data };
      // 수정된 데이터를 저장한다.
      const updateRequest = objectStore.put(newData);
      updateRequest.onsuccess = () => {
        resolve(true);
      };
      updateRequest.onerror = () => {
        reject(new Error('idb error'));
      };
    };

    getRequest.onerror = () => {
      reject(new Error('idb error'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function getDataFromIndexedDB<T>(
  STORE_NAME: string,
  key: string
): Promise<T> {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.get(key);

    request.onsuccess = () => {
      const data: T = request.result;
      resolve(data);
    };

    request.onerror = () => {
      reject(new Error('idb error'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function deleteDataToIndexedDB(
  STORE_NAME: string,
  key: string
): Promise<boolean> {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);

    const request = objectStore.delete(key);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      reject(new Error('idb error'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function getAllDataFromIndexedDB<T>(
  STORE_NAME: string
): Promise<T[]> {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);

    const request = objectStore.getAll();

    request.onsuccess = () => {
      const data: T[] = request.result;
      resolve(data);
    };

    request.onerror = () => {
      reject(new Error('idb error'));
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}
