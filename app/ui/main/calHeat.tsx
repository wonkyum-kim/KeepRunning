'use client';

// @ts-ignore
import CalHeatmap from 'cal-heatmap';
// @ts-ignore
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';
import { useEffect, useRef } from 'react';
import { useCalHeatmapStore } from '@/app/store/calHeatmapStore';
import { getAllDataFromIndexedDB } from '@/app/libs/idb';

// https://cal-heatmap.com/

const STORE_NAME = 'calHeat';

export interface Heat {
  id: string;
  date: string;
  dist: number;
}

export default function CalHeat() {
  const year = useCalHeatmapStore((state) => state.year);

  const cal = useRef<CalHeatmap>();
  const setHeats = useCalHeatmapStore((state) => state.setHeats);
  const heats = useCalHeatmapStore((state) => state.heats);

  if (!cal.current) cal.current = new CalHeatmap();

  cal.current.paint(
    {
      data: { source: heats, x: 'date', y: 'dist' },
      date: { start: new Date(year), locale: 'ko' },
      range: 12,
      scale: {
        color: {
          type: 'threshold',
          scheme: 'Blues',
          domain: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
        },
      },
      domain: {
        type: 'month',
        gutter: 4,
      },
      subDomain: { type: 'ghDay', radius: 4, width: 15, height: 15 },
    },
    [
      [
        Tooltip,
        {
          text: (timestamp: number, value: number, dayjsDate: any) => {
            return dayjsDate.format('LL') + ` ${value ?? 0}km`;
          },
        },
      ],
    ]
  );

  useEffect(() => {
    const getAllData = async () => {
      const data = await getAllDataFromIndexedDB<Heat>(STORE_NAME);
      // re-render
      setHeats(data);
    };

    getAllData();
  }, [setHeats]);

  return (
    <div className='flex overflow-x-scroll'>
      <div id='cal-heatmap' />
    </div>
  );
}
