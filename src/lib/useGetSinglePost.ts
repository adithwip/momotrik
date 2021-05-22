import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import { useQuery } from "react-query"
import { fetchAPI } from 'lib/fetchAPI'

export const getSinglePostFetcher = async (slug: string | string[] | undefined): Promise<GetSinglePostResponse> => {
  const res = await fetchAPI({
    query: `
      fragment PostFields on Post {
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
      
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ...PostFields
          content
        }
      }
    `,
    variables: {
      id: slug,
      idType: 'SLUG'
    }
  })

  return res.data.data
}

export const useGetSinglePost = (slug: string) => {
  const { data, isError, isFetching, isLoading } = useQuery(
    ["post", slug],
    () => getSinglePostFetcher(slug),
    { staleTime: 5 * 60 * 1000 }
  )

  return {
    getSinglePostData: {
      data,
      isError,
      isFetching,
      isLoading
    }
  } as const
}