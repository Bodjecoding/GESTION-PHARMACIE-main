import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    count: builder.query({
      query: (body) => ({
        url: "auth/count",
        method: "GET",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useCountQuery } = authApi;
