'use client';

import { useEffect } from 'react';
import { useShoesModalStore } from '../store/shoesModalStore';
import { useMileageStore, type Shoes } from '../store/mileageStore';
import Modal from '../ui/modal/Modal';
import { getAllDataFromIndexedDB } from '../libs/idb';
import Dashboard from './components/dashboard';
import AddForm from './components/addForm';
import ShoesCard from './components/shoesCard';

export default function Mileage() {
  const isOpen = useShoesModalStore((state) => state.isOpen);
  const setAllShoes = useMileageStore((state) => state.setAllShoes);
  const setSelectedShoes = useMileageStore((state) => state.setSelectedShoes);

  useEffect(() => {
    // indexedDB에서 신발을 모두 가져온다.
    const getAllData = async () => {
      const data = (await getAllDataFromIndexedDB()) as Shoes[];
      // zustand에 저장한다.
      setAllShoes(data);
      setSelectedShoes(data.length === 0 ? null : data[0]);
    };
    getAllData();
  }, [setAllShoes, setSelectedShoes]);

  return (
    <div className='flex flex-col gap-4 mb-[120px] md:mb-[50px]'>
      <h1 className='font-bold text-xl pb-4'>📝 신발 마일리지 기록</h1>
      <p>
        러닝화가 그동안 달린 거리를 기록할 수 있습니다.
        <br />
        신발 이미지를 클릭하면 기록을 수정하거나 추가할 수 있습니다.
        <br />
        🔜 더 많은 러닝화가 추가 예정될 예정입니다.
      </p>
      <Dashboard />
      {isOpen && (
        <Modal
          title='새로운 신발 추가하기'
          description='제조사, 신발, 기존 마일리지, 목표치를 입력하세요'
        >
          <AddForm />
        </Modal>
      )}
      <ShoesCard />
    </div>
  );
}
