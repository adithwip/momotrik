import type { GetAllPostsResponse } from 'interfaces/lib/getAllPosts.interface'

import { useQuery } from "react-query"
import { fetchAPI } from 'lib/fetchAPI'

type Count = number | undefined

/**
 * Exported for dehydrating state
 */
export const getAllPostsFetcher = async (count?: Count): Promise<GetAllPostsResponse> => {
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
      count
    }
  })

  return res.data.data
}

export const useGetAllPosts = (count?: Count) => {
  const { data, isError, isFetching } = useQuery('posts', () => getAllPostsFetcher(count))

  return {
    getAllPostsData: {
      data,
      isError,
      isFetching
    }
  } as const
}