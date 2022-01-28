import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useDetailStore = createStore(
  combine(
    {
      isDrawerOpen: false,
      appointmentId: undefined as number | undefined,
    },
    (set, get) => ({
      toggleDrawer: () =>
        set(({ isDrawerOpen }) => ({ isDrawerOpen: !isDrawerOpen })),

      setAppointmentId: (id: number) => set({ appointmentId: id }),
      reset: () =>
        set({
          isDrawerOpen: false,
          appointmentId: undefined,
        }),
    })
  )
);

export default useDetailStore;
