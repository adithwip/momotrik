import type { GetTrendingPostsResponse } from 'interfaces/lib/getTrendingPosts.interface'

import { useQuery } from "react-query"
import { fetchAPI } from 'lib/fetchAPI'

export const getRecentPostsFetcher = async (): Promise<GetTrendingPostsResponse> => {
  const res = await fetchAPI({
    query: `
      query AllPosts {
        posts(first: 4, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              id
              date
              title
              slug
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

export const useGetRecentPosts = () => {
  const { data, isError, isFetching } = useQuery('recent', () => getRecentPostsFetcher(), {
    staleTime: 5 * 60 * 1000
  })

  return {
    getRecentPostsData: {
      data,
      isError,
      isFetching
    }
  } as const
}