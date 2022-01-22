import createStore from 'zustand';
import { combine } from 'zustand/middleware';

const useStepsStore = createStore(
  combine({ step: 0, canContinue: false }, (set, get) => ({
    incrementStep: () =>
      set(({ step }) => ({ step: step === 5 ? step : step + 1 })),
    decrementStep: () =>
      set(({ step }) => ({ step: step === 0 ? step : step - 1 })),

    setCanContinue: (canContinue: boolean) => set({ canContinue }),
  }))
);

export default useStepsStore;
