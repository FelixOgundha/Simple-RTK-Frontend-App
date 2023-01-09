import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thecatapi.com/v1/',
  }),
  tagTypes: ['Votes'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/votes',
      providesTags: ['Votes'],
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-api-key': 'live_0uuQREE2Sp90a8kAf2jP9m1UabgBfNtXmaX1SKMSlYmfEA5k5RCAZB6xyXzICpH5'
      },
    }),
    addNewPost: builder.mutation({
      query: (payload) => ({
        url: '/votes',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-api-key': 'live_0uuQREE2Sp90a8kAf2jP9m1UabgBfNtXmaX1SKMSlYmfEA5k5RCAZB6xyXzICpH5'
        },
      }),
      invalidatesTags: ['Votes'],
    }),
    updatePost: builder.mutation({
      query: (payload) => {
        console.log(payload)
        const { id, ...body } = payload
        return {
          url: `/votes/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Votes'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/votes/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Votes'],
    }),

  }),
})
export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice