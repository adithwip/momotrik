import { fetchAPI } from './fetchAPI'

import type { GetAllPostsResponse } from '../interfaces/lib/getAllPosts.interface'

export const getAllPosts = async (): Promise<GetAllPostsResponse> => {
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
  );

  return res.data.data
}