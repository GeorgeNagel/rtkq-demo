import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Fact } from "./types"

// Define a service using a base URL and expected endpoints
export const catFactsApi = createApi({
  reducerPath: "catFacts",
  baseQuery: fetchBaseQuery({ baseUrl: "https://cat-fact.herokuapp.com/" }),
  endpoints: (builder) => ({
    getRandomFact: builder.query<Fact, void>({
      query: () => `facts/random`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetRandomFactQuery } = catFactsApi

export default catFactsApi.reducer
