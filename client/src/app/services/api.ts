import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBreeds: builder.query<any, string>({
            query: () => ({ url: '/api/breed' })
        }),
        getBreedById: builder.query<any, string>({
            query: (breed_id: string) => ({url:`/api/breed/${breed_id}`})
        }),
        getImagesByBreedId: builder.query<any, string>({
            query: (breed_id: string) => ({ url: `/api/breed/${breed_id}/images` })
        }),
        searchBreed: builder.query<any, string>({
            query: (q: string) => ({ url: `/api/search/breed?q=${q}` })
        })
    })
})

export const {
    useGetBreedsQuery,
    useGetBreedByIdQuery,
    useGetImagesByBreedIdQuery,
    useSearchBreedQuery
} = api;