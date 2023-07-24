import { createListenerMiddleware } from "@reduxjs/toolkit"
import { catFactsApi } from "./catFactsAPI"
import { Fact } from "./types"
import {
  setFactHasLetterE,
  setPerformingExpensiveCalculation,
} from "./catFactsSlice"

export const catFactListenerMiddleware = createListenerMiddleware()

const performExpensiveLetterPresenceCalculation = async (fact: Fact) => {
  const response = await new Promise<{ hasLetterE: boolean }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          hasLetterE: !!/.*[eE].*/.exec(fact.text),
        }),
      2000,
    ),
  )
  return response.hasLetterE
}

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
catFactListenerMiddleware.startListening({
  // Similar to:
  // matcher: catFactsApi.endpoints.getRandomFact.matchFulfilled,
  // but untyped for the sake of simpler
  predicate: (action) => action.type === "catFacts/executeQuery/fulfilled",
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setPerformingExpensiveCalculation())

    // Can cancel any active listeners (e.g. responding to a previous cat fact response)
    // listenerApi.cancelActiveListeners()

    // Run async logic
    const hasLetterE = await performExpensiveLetterPresenceCalculation(
      action.payload,
    )

    listenerApi.dispatch(setFactHasLetterE(hasLetterE))
  },
})
