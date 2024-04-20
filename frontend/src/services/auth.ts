
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "./endpoints";

// Define a function to get the auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};


export const authAPI = createApi({
  reducerPath: 'authAPI',
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
  tagTypes: ['Auth'], 
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/jobs/`,
      providesTags: ['Auth'], 
    }),
    getJobsByUser: builder.query({
      query: (id) => `/jobs/user/${id}`,
      providesTags: ['Auth'],
    }),
    getJob: builder.query({
      query: (id) => `/job/${id}`,
      providesTags: ['Auth'],
    }),
    updateJob: builder.mutation({
      query: (updateJob) => ({
        url: `/job/${updateJob._id}`,
        method: "PUT",
        body: updateJob,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Sign up and log in
    signup: builder.mutation({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ['Auth'], 
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ['Auth'], 
    }),
    
  }),
});


export const {
 useSignupMutation, useLoginMutation
} = authAPI;
;
