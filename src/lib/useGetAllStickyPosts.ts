import type {
  AllPostsNode,
  AllPostsEdge,
} from 'interfaces/lib/getAllPosts.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'
import { staleTime } from 'config/staleTimes'

import { QUERY_KEYS } from 'config/queryKeys'

/**
 * Exported for dehydrating state
 */
export const getAllStickyPostsFetcher = async (): Promise<AllPostsEdge[]> => {
  const res = await fetchAPI({
    query: `
      query AllStickyPosts {
        posts(first: 100, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              id
              date
              title
              slug
              excerpt
              isSticky
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

  const filterByIsSticky: AllPostsEdge[] = res.data.data.posts.edges.filter(
    ({ node }: { node: AllPostsNode }) => {
      return node.isSticky
    }
  )

  return filterByIsSticky
}

export const useGetAllStickyPosts = () => {
  const { data, isError, isFetching } = useQuery(
    QUERY_KEYS['stickyPosts'],
    () => getAllStickyPostsFetcher(),
    {
      staleTime: staleTime.ONE_DAY,
    }
  )

  return {
    getAllStickyPostsData: {
      data,
      isError,
      isFetching,
    },
  } as const
}
