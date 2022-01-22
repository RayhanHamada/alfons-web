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
          dataFilled: serviceIds.length === 1,
        })),

      resetServiceStore: () => set({ serviceIds: [], dataFilled: false }),
    })
  )
);

export default useServiceStore;
