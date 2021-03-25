import type { GetPopularPostsResponse } from 'interfaces/lib/getPopularPosts.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'

export const getPopularPostsFetcher = async (): Promise<GetPopularPostsResponse> => {
  const res = await fetchAPI({
    query: `
      query MyQuery {
        posts(where: {categoryId: 1516}, first: 4) {
          edges {
            node {
              id
              date
              slug
              title
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

export const useGetPopularPosts = () => {
  const { data, isError, isFetching } = useQuery('popular', () => getPopularPostsFetcher())

  return {
    getPopularPostsData: {
      data,
      isError,
      isFetching
    }
  } as const
}