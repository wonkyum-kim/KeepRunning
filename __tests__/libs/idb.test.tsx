import type { Heat } from '@/app/ui/main/calHeat';
import 'core-js/stable/structured-clone';
import {
  addDataToIndexedDB,
  deleteDataToIndexedDB,
  editDataFromIndexedDB,
  getAllDataFromIndexedDB,
  getDataFromIndexedDB,
} from '@/app/libs/idb';
import 'fake-indexeddb/auto';

describe('idb', () => {
  const heats: Heat[] = [
    { id: '2023-03-01', date: '2023-03-01', dist: 18.6 },
    { id: '2023-04-01', date: '2023-04-01', dist: 18.6 },
    { id: '2024-03-01', date: '2024-03-01', dist: 5 },
    { id: '2024-03-02', date: '2024-03-02', dist: 10 },
    { id: '2024-03-03', date: '2024-03-03', dist: 8.5 },
    { id: '2024-03-04', date: '2024-03-04', dist: 11.5 },
    { id: '2024-04-01', date: '2024-04-01', dist: 16.57 },
    { id: '2024-04-02', date: '2024-04-02', dist: 18 },
  ];
  const storeName = 'calHeat';

  it('삽입된 모든 데이터가 저장되는지 테스트', async () => {
    for (let i = 0; i < heats.length; ++i) {
      await addDataToIndexedDB<Heat>(storeName, heats[i]);
    }
    const data = await getAllDataFromIndexedDB<Heat>(storeName);
    expect(data).toEqual(heats);
  });

  it('삽입된 데이터를 잘 가져오는지 테스트', async () => {
    await addDataToIndexedDB<Heat>(storeName, heats[0]);
    const data = await getDataFromIndexedDB<Heat>(storeName, heats[0].id);
    expect(data).toEqual(heats[0]);
  });

  it('데이터를 잘 삭제하는지 테스트', async () => {
    await addDataToIndexedDB<Heat>(storeName, heats[0]);
    await expect(
      deleteDataToIndexedDB(storeName, heats[0].id)
    ).resolves.toEqual(true);
  });

  it('데이터를 잘 수정하는지 테스트', async () => {
    for (let i = 0; i < heats.length; ++i) {
      await addDataToIndexedDB<Heat>(storeName, heats[i]);
    }
    const newHeat = { ...heats[0], dist: 17.7 };
    await editDataFromIndexedDB<Heat>(storeName, newHeat, heats[0].id);
    const data = await getDataFromIndexedDB<Heat>(storeName, newHeat.id);
    expect(data).toEqual(newHeat);
  });
});
