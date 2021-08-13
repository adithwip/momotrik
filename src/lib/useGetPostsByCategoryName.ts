import type { GetPostsByCategoryNameResponse } from 'interfaces/lib/getPostsByCategoryName.interface'

import { useQuery } from 'react-query'
import { fetchAPI } from 'lib/fetchAPI'

type CategoryName =
  | 'mobil-listrik'
  | 'motor-listrik'
  | string
  | string[]
  | undefined

export const getPostsByCategoryNameFetcher = async (
  categoryName: CategoryName
): Promise<GetPostsByCategoryNameResponse> => {
  const res = await fetchAPI({
    query: `
      query PostsByCategory($categoryName: String!) {
        posts(where: {categoryName: $categoryName}) {
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
      categoryName,
    },
  })

  return res.data.data
}

export const useGetPostsByCategoryName = (categoryName: CategoryName) => {
  const { data, isError, isFetching, isLoading } = useQuery(
    ['postsByCategoryName', categoryName],
    () => getPostsByCategoryNameFetcher(categoryName),
    { staleTime: 5 * 60 * 1000 }
  )

  return {
    getPostsByCategoryName: {
      data,
      isError,
      isFetching,
      isLoading,
    },
  } as const
}
