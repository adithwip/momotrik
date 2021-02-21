import { useQuery } from "react-query"
import { fetchAPI } from 'lib/fetchAPI'

export const getSinglePostFetcher = async (slug: string) => {
  const res = await fetchAPI({
    query: `
      fragment PostFields on Post {
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl
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
  const { data, isError, isFetching } = useQuery(
    ["post", slug],
    () => getSinglePostFetcher(slug)
  )

  return {
    getSinglePostData: {
      data,
      isError,
      isFetching
    }
  } as const
}