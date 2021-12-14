import type { GetPopularPostsResponse } from 'interfaces/lib/getPopularPosts.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'
import { staleTime } from 'config/staleTimes'

export const getPopularPostsFetcher =
  async (): Promise<GetPopularPostsResponse> => {
    const res = await fetchAPI({
      query: `
        query PopularPosts {
          posts(where: {categoryId: 8}, first: 4) {
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
      `,
    })

    return res.data.data
  }

export const useGetPopularPosts = () => {
  const { data, isError, isFetching } = useQuery(
    'popular',
    () => getPopularPostsFetcher(),
    {
      staleTime: staleTime.ONE_DAY,
    }
  )

  return {
    getPopularPostsData: {
      data,
      isError,
      isFetching,
    },
  } as const
}
