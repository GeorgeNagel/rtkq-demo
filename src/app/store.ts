import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "src/features/counter/counterSlice"
import catFactsReducer from "src/features/catFacts/catFactsSlice"
import { postsApi } from "src/features/posts/postsApi"
import { catFactsApi } from "src/features/catFacts/catFactsAPI"
import { catFactListenerMiddleware } from "src/features/catFacts/listeners"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    catFactsExtra: catFactsReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [catFactsApi.reducerPath]: catFactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(catFactListenerMiddleware.middleware)
      .concat([postsApi.middleware, catFactsApi.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
