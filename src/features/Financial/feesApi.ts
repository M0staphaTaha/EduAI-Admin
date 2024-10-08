import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/components/BaseURL";

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

const getTokenFromCookie = () => {
  return getCookie("token");
};

export const feesApi = createApi({
  reducerPath: "feesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: headers => {
      const token = getTokenFromCookie();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getAllInvoices: builder.query({
      query: () => "/api/v1/invoice/all?size=10&page=0&getActive=1",
    }),
    //
    deleteInvoices: builder.mutation({
      query: id => ({
        url: `/api/v1/invoice/${id}`,
        method: "DELETE",
      }),
    }),
    //
    createInvoices: builder.mutation({
      query: formData => ({
        url: `/api/v1/invoice/`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    getInvoiceById: builder.query({
      query: id => `/api/v1/invoice/${id}`,
    }),
    //
    updateInvoices: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/v1/invoice/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllInvoicesQuery,
  useDeleteInvoicesMutation,
  useCreateInvoicesMutation,
  useGetInvoiceByIdQuery,
  useUpdateInvoicesMutation,
} = feesApi;
