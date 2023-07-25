# React and APIs
How is the React community interacting with APIs in 2023?

# Apollo
https://www.apollographql.com/docs/react/

- React client for GraphQL

# tRPC
https://trpc.io/

- Call backend JS functions (remote procedure call) typed with Typescript
- Abstracts away http as an "implementation detail"


# React Query
https://tanstack.com/query/latest

- React bindings for a query library that handles Caching, Dedupe requests, etc.
- `useQuery` hook, which gives access to `data, isLoading, error`
- Agnostic to other state management layers, e.g. Redux

# Redux-Observable
https://redux-observable.js.org/

- Built on Observables (event streams)
- Like Promises, learn once and apply in other situations outside of Redux

# Redux Toolkit Query
https://redux-toolkit.js.org/rtk-query/overview

- Built on Promises
- Like React Query, can handle caching, request lifecycle state management
- Integrated into Redux like Redux-Observable (actions in, actions out)
