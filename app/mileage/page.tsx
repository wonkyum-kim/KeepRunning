'use client';

import { useEffect, useRef, useState } from 'react';
import { useShoeSelectModalStore } from '../store/modalStore';
import Modal from '../ui/modal/Modal';
import Image from 'next/image';
import { getAllDataFromIndexedDB } from '../libs/idb';
import Dashboard from './components/dashboard';
import AddForm from './components/addForm';
import { useShoesStore } from '../store/shoesStore';

// https://dev.to/andyhaskell/testing-your-indexeddb-code-with-jest-2o17
// https://ko.javascript.info/indexeddb#ref-467
// https://bloodstrawberry.tistory.com/1265
// TODO: 신발 카드 만들기, 더보기 수정하기, 날짜 수정하기

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
    const getAllData = async () => {
      const data = (await getAllDataFromIndexedDB()) as ShoesProps[];
      setAllShoes(data);
    };
    getAllData();
  }, [isOpen]);

  let selectedShoes = allShoes.find((item) => {
    return item.id === selected;
  });

  if (allShoes.length) selectedShoes = allShoes[0];

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-bold text-xl pb-4'>📝 신발 마일리지 기록</h1>
      <p>
        러닝화가 그동안 달린 거리를 기록할 수 있습니다.
        <br />
        🔜 더 많은 러닝화가 추가 예정될 예정이에요
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
    </div>
  );
}
