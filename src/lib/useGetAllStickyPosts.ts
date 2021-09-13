import type {
  AllPostsNode,
  AllPostsEdge,
} from 'interfaces/lib/getAllPosts.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'
import { staleTime } from 'constants/staleTimes'

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

  const filterByIsSticky: AllPostsEdge[] = res.data.data.posts.edges.filter(
    ({ node }: { node: AllPostsNode }) => {
      return node.isSticky
    }
  )

  return filterByIsSticky
}

export const useGetAllStickyPosts = () => {
  const { data, isError, isFetching } = useQuery(
    'stickyPosts',
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
