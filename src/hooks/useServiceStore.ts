import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useServiceStore = createStore(
  combine(
    {
      isDrawerOpen: false,

      serviceIds: [] as number[],
      dataFilled: false,
      note: '',
    },
    (set, get) => ({
      toggleDrawer: () =>
        set(({ isDrawerOpen }) => ({ isDrawerOpen: !isDrawerOpen })),
      closeDrawer: () => set({ isDrawerOpen: false }),

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
      setNote: (note: string) => set({ note }),
      reset: () =>
        set({
          isDrawerOpen: false,
          serviceIds: [],
          note: '',
          dataFilled: false,
        }),
    })
  )
);

export default useServiceStore;
