import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useJamStylishStore = createStore(
  combine(
    {
      stylishId: undefined as number | undefined,
      jamId: undefined as number | undefined,
      dataFilled: false,
    },
    (set, get) => ({
      setStylishId: (stylishId: number) =>
        set({
          stylishId,
          jamId: undefined,
          dataFilled: false,
        }),
      setJamId: (jamId: number) =>
        set({
          jamId,
          dataFilled: true,
        }),
    })
  )
);

export default useJamStylishStore;
