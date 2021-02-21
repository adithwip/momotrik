import type { GetAllPostsResponse } from 'interfaces/lib/getAllPosts.interface'

import { useQuery } from "react-query"
import { fetchAPI } from 'lib/fetchAPI'

/**
 * Exported for dehydrating state
 */
export const getAllPostsFetcher = async (): Promise<GetAllPostsResponse> => {
  const res = await fetchAPI({
    query: `
      query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC}}) {
          edges {
            node {
              id
              date
              title
              slug
              excerpt
              extraPostInfo {
                authorExcerpt
                thumbImage {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    `
  }
  )

  return res.data.data
}

export const useGetAllPosts = () => {
  const { data, isError, isFetching } = useQuery('posts', () => getAllPostsFetcher())

  return {
    getAllPostsData: {
      data,
      isError,
      isFetching
    }
  } as const
}