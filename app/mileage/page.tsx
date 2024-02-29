'use client';

import { useEffect, useState } from 'react';
import { useShoeSelectModalStore } from '../store/modalStore';
import Modal from '../ui/modal/Modal';
import { getAllDataFromIndexedDB } from '../libs/idb';
import Dashboard from './components/dashboard';
import AddForm from './components/addForm';
import { useShoesStore } from '../store/shoesStore';
import ShoesCard from './components/shoesCard';

export interface ShoesProps {
  id: string;
  maker: string;
  name: string;
  acc: number;
  goal: number;
  imageSrc: string;
  created: Date;
}

export default function Mileage() {
  const isOpen = useShoeSelectModalStore((state) => state.isOpen);
  const selected = useShoesStore((state) => state.selected);
  const [allShoes, setAllShoes] = useState<ShoesProps[]>([]);

  useEffect(() => {
    // indexedDB에서 신발을 모두 가져온다.
    const getAllData = async () => {
      const data = (await getAllDataFromIndexedDB()) as ShoesProps[];
      setAllShoes(data);
    };
    getAllData();
  }, [isOpen]);

  let selectedShoes = allShoes.find((item) => {
    return item.id === selected;
  });

  if (!selectedShoes && allShoes.length) selectedShoes = allShoes[0];
  else if (!selectedShoes) {
    selectedShoes = {
      id: 'null',
      maker: 'null',
      name: 'null',
      acc: 0,
      goal: 0,
      imageSrc: 'null',
      created: new Date(),
    };
  }

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
      <Dashboard allShoes={allShoes} />
      {isOpen && (
        <Modal
          title='새로운 신발 추가하기'
          description='제조사, 신발, 기존 마일리지, 목표치를 입력하세요'
        >
          <AddForm />
        </Modal>
      )}
      <ShoesCard shoes={selectedShoes} />
    </div>
  );
}
