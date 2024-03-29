import type { GetTrendingPostsResponse } from 'interfaces/lib/getTrendingPosts.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'
import { staleTime } from 'config/staleTimes'

export const getTrendingPostsFetcher =
  async (): Promise<GetTrendingPostsResponse> => {
    const res = await fetchAPI({
      query: `
        query TrendingPosts {
          posts(where: {categoryId: 11}, first: 5) {
            edges {
              node {
                id
                date
                slug
                title
                featuredImage {
                  node {
                    mediaItemUrl
                    sizes(size: MEDIUM_LARGE)
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

export const useGetTrendingPosts = () => {
  const { data, isError, isFetching } = useQuery(
    'trending',
    () => getTrendingPostsFetcher(),
    {
      staleTime: staleTime.ONE_DAY,
    }
  )

  return {
    getTrendingPostsData: {
      data,
      isError,
      isFetching,
    },
  } as const
}
