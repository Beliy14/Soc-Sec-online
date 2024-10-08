import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL, API_KEY, TOKEN } from "../consts"

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", API_KEY)
      headers.set("Authorization", `Bearer ${TOKEN}`)
      return headers
    },
    fetchFn: (input, init) => {
      return fetch(input, { ...init, credentials: "include" })
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
      }),
    }),

    getProfileStatus: builder.query({
      query: (id) => ({
        url: `/profile/status/${id}`,
      }),
    }),

    updateProfileStatus: builder.mutation({
      query: (status) => ({
        url: `/profile/status`,
        method: "PUT",
        body: { status },
      }),
    }),

    updateProfilePhoto: builder.mutation({
      query: (photo) => {
        const formData = new FormData()
        formData.append("image", photo)
        return {
          url: "/profile/photo",
          method: "PUT",
          body: formData,
        }
      },
    }),

    updateProfileInfo: builder.mutation({
      query: (profile) => ({
        url: `/profile`,
        method: "PUT",
        body: profile,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useGetProfileStatusQuery, useUpdateProfileStatusMutation, useUpdateProfilePhotoMutation, useUpdateProfileInfoMutation } = profileApi
