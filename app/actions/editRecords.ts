'use server';

import prisma from '@/app/libs/prismadb';
import { getStrava } from './getStrava';

export async function editRecords(formData: FormData) {
  const strava = await getStrava();

  const activities = strava?.map((record: any) => {
    return {
      time: record.moving_time,
      distance: record.distance / 1000,
      date: record.start_date_local,
    };
  });

  // 선택된 날짜 기록들
  const selected = activities.filter((act: any) => {
    return formData.get(act.date)?.toString() === 'on';
  });

  // 선택된 날짜의 시간 합
  const totalTime = selected.reduce((acc: number, item: any) => {
    return acc + item.time;
  }, 0);

  // 선택된 날짜의 거리 합
  let totalDist = selected.reduce((acc: number, item: any) => {
    return acc + item.distance;
  }, 0);
  totalDist = totalDist.toFixed(2);

  // 신발 이름
  const name = formData.get('name')?.toString();

  // 일단 이전 기록을 지운다.
  await prisma.shoes.update({
    where: {
      name: name,
    },
    data: {
      records: {
        deleteMany: {},
      },
    },
  });

  // 새로운 기록을 추가한다.
  selected.forEach(async (select: any) => {
    await prisma.shoes.update({
      where: {
        name: name,
      },
      data: {
        records: {
          create: {
            date: select.date,
            shoesName: name ?? '',
          },
        },
      },
    });
  });

  // 시간과 기록을 업데이트한다.
  await prisma.shoes.update({
    where: {
      name: name,
    },
    data: {
      accTime: totalTime,
      mileage: +totalDist,
    },
  });
}
