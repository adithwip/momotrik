import type { GetAllPostSlugsResponse } from 'interfaces/lib/getAllPostSlugs.interface'

import { fetchAPI } from 'lib/fetchAPI'

export const getAllPostSlugsFetcher = async (): Promise<GetAllPostSlugsResponse> => {
  const res = await fetchAPI({
    query: `
      {
        posts(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  })

  return res.data.data
}