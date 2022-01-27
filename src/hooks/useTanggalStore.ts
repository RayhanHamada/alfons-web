import { dayjs, Dayjs } from '@/utility/dayjs';
import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useTanggalStore = createStore(
  combine(
    {
      tanggal: dayjs().startOf('day'),
    },
    (set, get) => ({
      setTanggal: (tanggal: Dayjs) =>
        set({
          tanggal,
        }),
      reset: () =>
        set({
          tanggal: dayjs().startOf('day'),
        }),
    })
  )
);

export default useTanggalStore;
