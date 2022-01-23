import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useDataDiri = createStore(
  combine(
    {
      name: '',
      phoneNumber: '',
      jenisKelamin: 'PRIA' as 'PRIA' | 'WANITA',
      dataFilled: false,
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
          dataFilled: true,
        }),

      resetDataDiri: () =>
        set({
          name: '',
          phoneNumber: '',
          jenisKelamin: 'PRIA',
          dataFilled: false,
        }),
    })
  )
);

export default useDataDiri;
