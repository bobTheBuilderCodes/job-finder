// Import necessary dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const countriesAPI = createApi({
  reducerPath: "countriesAPI",
  baseQuery: fetchBaseQuery({
    
  }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => `https://restcountries.com/v3.1/all?fields=name`
    }),
    
  }),
});

export const {
 useGetCountriesQuery
} = countriesAPI;
