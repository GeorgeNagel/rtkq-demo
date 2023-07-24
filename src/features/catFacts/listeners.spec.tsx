import { vi } from "vitest"
import {
  configureStore,
  addListener,
  createAction,
  Reducer,
} from "@reduxjs/toolkit"

import { catFactListenerMiddleware } from "./listeners"
import { Fact } from "./types"

describe("catFactListenerMiddleware", () => {
  it("should dispatch an action on completion of the expensive calculation", async () => {
    // See the following for examples on testing middleware and RTKQ
    // https://github.com/reduxjs/redux-toolkit/blob/2b549dd7e0b62c6223f866e600c342c7117d3968/packages/toolkit/src/listenerMiddleware/tests/useCases.test.ts
    // https://github.com/reduxjs/redux-toolkit/blob/2b549dd7e0b62c6223f866e600c342c7117d3968/packages/toolkit/src/listenerMiddleware/tests/effectScenarios.test.ts
    // https://github.com/reduxjs/redux-toolkit/blob/2b549dd7e0b62c6223f866e600c342c7117d3968/packages/toolkit/src/query/tests/buildMiddleware.test.tsx#L41

    // Set up our store with the listener middleware that we want to test
    const rootReducer: Reducer = (state, action) => state
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(catFactListenerMiddleware.middleware),
    })

    // Configure our Spy to inspect which actions are dispatched
    const spy = vi.fn()
    // ListenerMiddleware can accept a `predicate` which returns a boolean given action/currentState/originalState args
    const matchAnyPredicate = () => true
    // Listeners can be dynamically added to the store
    // https://redux-toolkit.js.org/api/createListenerMiddleware#addlistener
    store.dispatch(
      addListener({
        predicate: matchAnyPredicate,
        effect: async (action): Promise<void> => {
          spy(action)
        },
      }),
    )

    // Dispatch the "fulfilled" action for the getRandomFact endpoint
    // This simulates a successful fulfillment of that API
    const factFulfilledActionCreator = createAction<Fact>(
      "catFacts/executeQuery/fulfilled",
    )
    const fact: Fact = {
      _id: "abc",
      _v: 1,
      user: "fake_user",
      text: "some text with the letter e",
      sendDate: "2010-01-01",
      deleted: false,
      source: "user",
      type: "fact",
    }
    store.dispatch(factFulfilledActionCreator(fact))

    // Wait for the middleware to process the action
    await new Promise((resolve) => setTimeout(resolve, 2100))

    // Check that the correct actions have been dispatched
    expect(spy.mock.calls).toEqual([
      [
        {
          payload: undefined,
          type: "catFactsExtra/setPerformingExpensiveCalculation",
        },
      ],
      [
        {
          payload: {
            _id: "abc",
            _v: 1,
            deleted: false,
            sendDate: "2010-01-01",
            source: "user",
            text: "some text with the letter e",
            type: "fact",
            user: "fake_user",
          },
          type: "catFacts/executeQuery/fulfilled",
        },
      ],
      [
        {
          payload: true,
          type: "catFactsExtra/setFactHasLetterE",
        },
      ],
    ])
  })
})
