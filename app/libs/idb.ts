const DB_NAME = 'keep-running';
const STORE_NAME = 'mileage';

function openIndexedDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 2);

    request.onerror = () => {
      reject('IndexedDB 접근 오류');
    };

    request.onsuccess = () => {
      const db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORE_NAME, {
        keyPath: 'id',
      });
    };
  });
}

export async function addDataToIndexedDB(data: unknown) {
  const db = await openIndexedDB();

  return new Promise((resolve) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.put(data);

    request.onsuccess = () => {
      resolve('data added!');
    };

    request.onerror = () => {
      console.log('request error');
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

// export async function getDataFromIndexedDB(key) {
//   const db = await openIndexedDB();

//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction(STORE_NAME, 'readonly');
//     const objectStore = transaction.objectStore(STORE_NAME);

//     const request = objectStore.get(key);

//     request.onsuccess = (e) => {
//       const data = e.target.result;
//       resolve(data);
//     };

//     request.onerror = (e) => {
//       reject('error', e);
//     };

//     transaction.oncomplete = () => {
//       db.close();
//     };
//   });
// }

// export async function deleteDataToIndexedDB(key) {
//   const db = await openIndexedDB();

//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction(STORE_NAME, 'readwrite');
//     const objectStore = transaction.objectStore(STORE_NAME);

//     const request = objectStore.delete(key);
//     console.log(request);
//     request.onsuccess = () => {
//       resolve('delete ok!');
//     };

//     request.onerror = (e) => {
//       reject('error', e);
//     };

//     transaction.oncomplete = () => {
//       db.close();
//     };
//   });
// }

export async function getAllDataFromIndexedDB() {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);

    const request = objectStore.getAll();

    request.onsuccess = () => {
      const data: unknown = request.result;
      resolve(data);
    };

    request.onerror = () => {
      reject('데이터 조회 중 오류가 발생했습니다.');
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}
