import type { GetPostsBySearchResponse } from 'interfaces/lib/getPostsBySearch.interface'

import { useQuery } from "react-query"
import { fetchAPI } from 'lib/fetchAPI'

type QuerySearch = string | string[] | undefined

export const getPostsBySearch = async (search: QuerySearch): Promise<GetPostsBySearchResponse> => {
  const res = await fetchAPI({
    query: `
      query PostsBySearch($search: String!) {
        posts(where: {search: $search}) {
          edges {
            node {
              id
              title
              excerpt
              slug
              date
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              author {
                node {
                  name
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      search
    }
  })

  return res.data.data
}

export const useGetPostsBySearch = (search: QuerySearch) => {
  const { data, isError, isFetching, isLoading } = useQuery(
    ["postBySearch", search],
    () => getPostsBySearch(search)
  )

  return {
    getPostsBySearchData: {
      data,
      isError,
      isFetching,
      isLoading
    } 
  } as const
}