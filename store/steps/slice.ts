import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

type StepState = {
  step: number;
};

const initialState: StepState = {
  step: 1,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    nextStep(state) {
      if (state.step < 5) {
        state.step += 1;
      }
    },
    prevStep(state) {
      if (state.step > 1) {
        state.step -= 1;
      }
    },
  },
});

export const { setStep, nextStep, prevStep } = stepSlice.actions;

export const selectStep = ({ step }: RootState) => step.step;

export const selectIsLastStep = ({ step }: RootState) => step.step === 5;

export const stepReducerPath = stepSlice.name;

export default stepSlice.reducer;
