import type { GetRecentPostsResponse } from 'interfaces/lib/getRecentPosts.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'
import { staleTime } from 'config/staleTimes'

export const getRecentPostsFetcher =
  async (): Promise<GetRecentPostsResponse> => {
    const res = await fetchAPI({
      query: `
      query RecentPosts {
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
    `,
    })

    return res.data.data
  }

export const useGetRecentPosts = () => {
  const { data, isError, isFetching } = useQuery(
    'recent',
    () => getRecentPostsFetcher(),
    {
      staleTime: staleTime.ONE_DAY,
    }
  )

  return {
    getRecentPostsData: {
      data,
      isError,
      isFetching,
    },
  } as const
}
