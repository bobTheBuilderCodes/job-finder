// Import necessary dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "./endpoints";

// Define a function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Define the API endpoint and access token
const access = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWYxYjE4NDk4MGNlZWUwOWI4Mjc2ZDAiLCJpYXQiOjE3MTExNjcxMTUsImV4cCI6MTcxMTMzOTkxNX0.UyNUSaIcab7VXHNhZm1t2bLrHPG1iBceLlufiOMj4ko`;

// Create the category API
export const jobsAPI = createApi({
  reducerPath: "jobsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    // prepareHeaders: (headers) => {
    //   const token = getAuthToken();
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${access}`);
    //   }
    //   return headers;
    // },
    
  }),

  // Define the endpoints
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => `/jobs/`,
      // providesTags: ['categories'],
    }),
    getJob: builder.query({
      query: (id) => `/job/${id}`,
    }),

    // Update category mutation
    updateJob: builder.mutation({
      query: (updateJob) => ({
        url: `/job/${updateJob.id}`,
        method: "PUT",
        body: updateJob,
      }),
      // invalidatesTags: ['categories'] 
    }),

    // Create category mutation
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
