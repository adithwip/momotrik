import type { GetAllPostsResponse } from 'interfaces/lib/getAllPosts.interface'
import type { QueryKey } from 'react-query'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'
import { staleTime } from 'config/staleTimes'

import { QUERY_KEYS } from 'config/queryKeys'

type Count = number | undefined

/**
 * Exported for dehydrating state
 */
export const getAllPostsFetcher = async (
  count?: Count
): Promise<GetAllPostsResponse> => {
  const res = await fetchAPI({
    query: `
      query AllPosts($count: Int = 30) {
        posts(first: $count, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              id
              date
              title
              slug
              excerpt
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
    variables: {
      count,
    },
  })

  return res.data.data
}

export const useGetAllPosts = (count?: Count, key: QueryKey = QUERY_KEYS['posts']) => {
  const { data, isError, isFetching } = useQuery(
    key,
    () => getAllPostsFetcher(count),
    {
      staleTime: staleTime.FIVE_MINUTES,
    }
  )

  return {
    getAllPostsData: {
      data,
      isError,
      isFetching,
    },
  } as const
}
