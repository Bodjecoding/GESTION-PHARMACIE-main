// contactApi.js

import { api } from "./api";

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint pour récupérer tous les contacts de l'utilisateur
    getContacts: builder.query({
      query: () => ({
        url: "contact/get",
        method: "GET",
      }),
    }),

    //Endpoint pour recuperer id du contact
    getContactById: builder.query({
      query: (id) => ({
        url: `contact/${id}`,
        method: "GET",

      }),
    }),

    // Endpoint pour créer un nouveau contact
    createContact: builder.mutation({
      query: (body) => ({
        url: "contact/create",
        method: "POST",
        body,
      }),
      // Lorsqu'un nouveau contact est créé, invalider le cache des contacts pour forcer la mise à jour de la liste des contacts
      invalidatesTags: ["contacts"],
    }),

    // Endpoint pour supprimer un contact
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contact/delete/${id}`,
        method: "DELETE",
      }),
      // Lorsqu'un contact est supprimé, invalider le cache des contacts pour forcer la mise à jour de la liste des contacts
      invalidatesTags: ["contacts"],
    }),

    // Endpoint pour mettre à jour un contact
    updateContact: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `contact/update/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      // Lorsqu'un contact est mis à jour, invalider le cache des contacts pour forcer la mise à jour de la liste des contacts
      invalidatesTags: ["contacts"],
    }),
    countContact: builder.query({
      query: (body) => ({
        url: "contact/count/get",
        method: "GET",
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

// Exportez les hooks d'action générés par l'API
export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useGetContactByIdQuery,
  useCountContactQuery,
} = contactApi;
