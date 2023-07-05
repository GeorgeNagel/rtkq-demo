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
  matcher: catFactsApi.endpoints.getRandomFact.matchFulfilled,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log("Todo added: ", action.payload.text)

    // Can cancel other running instances
    listenerApi.cancelActiveListeners()

    listenerApi.dispatch(setPerformingExpensiveCalculation())

    // Run async logic
    const hasLetterE = await performExpensiveLetterPresenceCalculation(
      action.payload,
    )

    listenerApi.dispatch(setFactHasLetterE(hasLetterE))
  },
})
