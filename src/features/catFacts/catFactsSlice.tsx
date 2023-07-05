import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "src/app/store"
import { catFactsApi } from "./catFactsAPI"

export interface CatFactsState {
  factRequestSuccesses: number
  factHasLetterE: boolean
  performingExpensiveCalculation: boolean
}

const initialState: CatFactsState = {
  factRequestSuccesses: 0,
  factHasLetterE: false,
  performingExpensiveCalculation: true,
}

export const catFactsSlice = createSlice({
  name: "catFactsExtra",
  initialState,
  reducers: {
    setFactHasLetterE: (state, action: PayloadAction<boolean>) => {
      state.factHasLetterE = action.payload
      state.performingExpensiveCalculation = false
    },
    setPerformingExpensiveCalculation: (state) => {
      state.performingExpensiveCalculation = true
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      catFactsApi.endpoints.getRandomFact.matchPending,
      (state) => {
        state.factRequestSuccesses = state.factRequestSuccesses + 1
      },
    )
  },
})

export default catFactsSlice.reducer

export const { setFactHasLetterE, setPerformingExpensiveCalculation } =
  catFactsSlice.actions

export const selectFactRequestSuccesses = (state: RootState) =>
  state.catFactsExtra.factRequestSuccesses

export const selectFactHasLetterE = (state: RootState) =>
  state.catFactsExtra.factHasLetterE

export const selectPerformingExpensiveCalculation = (state: RootState) =>
  state.catFactsExtra.performingExpensiveCalculation
