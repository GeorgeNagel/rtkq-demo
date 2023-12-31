import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Post } from "./types"

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `posts/`,
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}/`,
    }),
    createPost: builder.mutation<Post, string>({
      query: (message: string) => ({
        url: `posts/`,
        method: "POST",
        body: {
          text: message,
        },
      }),
    }),
    deletePost: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useLazyGetPostByIdQuery } = postsApi
