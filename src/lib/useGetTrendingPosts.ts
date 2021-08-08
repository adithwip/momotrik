import type { GetTrendingPostsResponse } from 'interfaces/lib/getTrendingPosts.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'

export const getTrendingPostsFetcher = async (): Promise<GetTrendingPostsResponse> => {
  const res = await fetchAPI({
    query: `
      query TrendingPosts {
        posts(where: {categoryId: 1515}, first: 5) {
          edges {
            node {
              id
              date
              slug
              title
              featuredImage {
                node {
                  mediaItemUrl
                  sizes(size: THUMBNAIL)
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
  const { data, isError, isFetching } = useQuery('trending', () => getTrendingPostsFetcher(), {
    staleTime: 5 * 60 * 1000
  })

  return {
    getTrendingPostsData: {
      data,
      isError,
      isFetching
    }
  } as const
}