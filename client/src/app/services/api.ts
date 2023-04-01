import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BreedStatRequest, BreedStatResponse } from '../../models/BreedStat';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.SERVER_HOST,
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
            query: (breed_id: string) => ({ url: `/api/breed/${breed_id}` })
        }),
        getImagesByBreedId: builder.query<any, string>({
            query: (breed_id: string) => ({ url: `/api/breed/${breed_id}/images` })
        }),
        searchBreed: builder.query<any, string>({
            query: (q: string) => ({ url: `/api/search/breed?q=${q}` })
        }),
        getTopTenViewedBreeds: builder.query<BreedStatResponse[], string>({
            query: () => ({ url: `/api/stats?report_id=REPORT_TOP_TEN_SEARCHES` })
        }),
        logBreedClick: builder.mutation({
            query: (payload: BreedStatRequest) => ({
                url: `/api/stats?report_id=REPORT_TOP_TEN_SEARCHES`,
                method: 'POST',
                body: payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
})

export const {
    useGetBreedsQuery,
    useGetBreedByIdQuery,
    useGetImagesByBreedIdQuery,
    useSearchBreedQuery,
    useGetTopTenViewedBreedsQuery,
    useLogBreedClickMutation
} = api;