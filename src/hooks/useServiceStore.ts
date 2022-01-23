import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useServiceStore = createStore(
  combine(
    {
      serviceIds: [] as number[],
      dataFilled: false,
    },
    (set, get) => ({
      addServiceId: (id: number) =>
        set(({ serviceIds }) => ({
          serviceIds: serviceIds.includes(id)
            ? serviceIds
            : [...serviceIds, id],
          dataFilled: true,
        })),

      removeServiceId: (id: number) =>
        set(({ serviceIds }) => ({
          serviceIds: serviceIds.filter((iid) => iid !== id),
          //   jika service tinggal 1 atau gaada, dan melakukan remove, anggap data belum diisi
          dataFilled: ![0, 1].includes(serviceIds.length),
        })),

      resetServiceStore: () => set({ serviceIds: [], dataFilled: false }),
    })
  )
);

export default useServiceStore;
