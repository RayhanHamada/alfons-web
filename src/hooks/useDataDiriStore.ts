import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useDataDiri = createStore(
  combine(
    {
      isChecked: false,
      id: undefined as number | undefined,
      name: '',
      phoneNumber: '',
      jenisKelamin: 'PRIA' as 'PRIA' | 'WANITA',
      dataFilled: false,
    },
    (set, get) => ({
      setIsChecked: (isChecked: boolean) => set({ isChecked }),

      setId: (id: number) => set({ id }),
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
