
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "./endpoints";

// Define a function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};


export const applicationAPI = createApi({
  reducerPath: 'applicationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['application'], 
  endpoints: (builder) => ({
    getapplications: builder.query({
      query: () => `/applications/`,
      providesTags: ['application'], 
    }),
    getApplicationByUser: builder.query({
      query: (userId) => `/apply/user/${userId}`,
      providesTags: ['application'],
    }),
    
    apply: builder.mutation({
      query: (apply) => ({
        url: `/apply/${apply.jobId}`,
        method: "POST",
        body: apply,
      }),
      invalidatesTags: ['application'],
    }),
    updateApplication: builder.mutation({
      query: (updateJob) => ({
        url: `/job/${updateJob._id}`,
        method: "PUT",
        body: updateJob,
      }),
      invalidatesTags: ['application'],
    }),
    deleteApplication: builder.mutation({
      query: (payload) => ({
        url: `/job/${payload._id}`,
        method: "DELETE",
        body: payload
      }), 
      invalidatesTags: ['application']
    })
  }),
});


export const {
  useGetApplicationByUserQuery,
useApplyMutation
} = applicationAPI;
;
