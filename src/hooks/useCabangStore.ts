import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useCabangStore = createStore(
  combine(
    {
      cabangId: 1,
      dataFilled: false,
    },
    (set, get) => ({
      setCabang: (cabangId: number) =>
        set({
          cabangId,
          dataFilled: true,
        }),

      reset: () =>
        set({
          cabangId: 1,
          dataFilled: false,
        }),
    })
  )
);

export default useCabangStore;
