// Import necessary dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "./endpoints";

// Define a function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};


export const jobsAPI = createApi({
  reducerPath: "jobsAPI",
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
  endpoints: (builder) => ({
    // Your endpoint definitions...
    getJobs: builder.query({
      query: () => `/jobs/`,
    }),
    getJob: builder.query({
      query: (id) => `/job/${id}`,
    }),
    updateJob: builder.mutation({
      query: (updateJob) => ({
        url: `/job/${updateJob.id}`,
        method: "PUT",
        body: updateJob,
      }),
    }),
    postJob: builder.mutation({
      query: (newJob) => ({
        url: "/job",
        method: "POST",
        body: newJob,
      }),
    }),
  }),
});


// Export the hooks for the API endpoints
export const {
  useGetJobQuery, useGetJobsQuery, useUpdateJobMutation, usePostJobMutation
} = jobsAPI;
