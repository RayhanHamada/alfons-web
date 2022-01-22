import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useDataDiri = createStore(
  combine(
    {
      name: '',
      phoneNumber: '',
      jenisKelamin: 'PRIA' as 'PRIA' | 'WANITA',
    },
    (set, get) => ({
      setName: (name: string) => set({ name }),
      setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
      setJenisKelamin: (jenisKelamin: 'PRIA' | 'WANITA') =>
        set({ jenisKelamin }),

      setDataDiri: (dataDiri: {
        name: string;
        phoneNumber: string;
        jenisKelamin: 'PRIA' | 'WANITA';
      }) =>
        set({
          ...dataDiri,
        }),

      resetDataDiri: () =>
        set({ name: '', phoneNumber: '', jenisKelamin: 'PRIA' }),
    })
  )
);

export default useDataDiri;
