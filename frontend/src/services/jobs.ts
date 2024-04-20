
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "./endpoints";

// Define a function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};


export const jobsAPI = createApi({
  reducerPath: 'jobsAPI',
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
  tagTypes: ['Jobs'], 
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => `/jobs/`,
      providesTags: ['Jobs'], 
    }),
    getJobsByUser: builder.query({
      query: () => `/jobs/user/661a7440f34ab18c9e35fcb2`,
      providesTags: ['Jobs'],
    }),
    getJob: builder.query({
      query: (id) => `/job/${id}`,
      providesTags: ['Jobs'],
    }),
    updateJob: builder.mutation({
      query: (updateJob) => ({
        url: `/job/${updateJob._id}`,
        method: "PUT",
        body: updateJob,
      }),
      invalidatesTags: ['Jobs'],
    }),
    postJob: builder.mutation({
      query: (newJob) => ({
        url: "/job",
        method: "POST",
        body: newJob,
      }),
      invalidatesTags: ['Jobs'], 
    }),
    deleteJob: builder.mutation({
      query: (payload) => ({
        url: `/job/${payload._id}`,
        method: "DELETE",
        body: payload
      }), 
      invalidatesTags: ['Jobs']
    })
  }),
});


export const {
  useGetJobQuery, useGetJobsByUserQuery, useGetJobsQuery, useUpdateJobMutation, usePostJobMutation, useDeleteJobMutation
} = jobsAPI;
;
