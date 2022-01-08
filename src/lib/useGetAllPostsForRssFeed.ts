import type { GetAllPostsForRssResponse } from 'interfaces/lib/getAllPostsForRssFeed'

import { fetchAPI } from 'lib/fetchAPI'

export const getAllPostsForRssFeed =
  async (): Promise<GetAllPostsForRssResponse> => {
    const res = await fetchAPI({
      query: `
      query AllPostsForRssFeed($count: Int = 30) {
        posts(first: $count, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              id
              date
              title
              slug
              excerpt
              categories {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              author {
                node {
                  name
                  email
                }
              }
            }
          }
        }
      }
    `,
    })

    return res.data.data
  }
