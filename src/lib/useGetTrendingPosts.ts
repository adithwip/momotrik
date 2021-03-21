import type { GetTrendingPostsResponse } from 'interfaces/lib/getTrendingPosts.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'

export const getTrendingPostsFetcher = async (): Promise<GetTrendingPostsResponse> => {
  const res = await fetchAPI({
    query: `
      query MyQuery {
        posts(where: {categoryId: 1515}, first: 3) {
          edges {
            node {
              id
              date
              slug
              title
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
    `
  })

  return res.data.data
}

export const useGetTrendingPosts = () => {
  const { data, isError, isFetching } = useQuery('trending', () => getTrendingPostsFetcher())

  return {
    getTrendingPostsData: {
      data,
      isError,
      isFetching
    }
  } as const
}