import axios from "axios";

const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL

type Params = {
  query: string,
  variables?: {
    id?: string | string[] | undefined,
    idType?: string,
    categoryName?: string | string[] | undefined,
    search?: string | string[] | undefined,
    count?: number | undefined
  }
}

export const fetchAPI = async ({ query, variables }: Params) => {
  try {
    const res = await axios({
      url: WP_GRAPHQL_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        query,
        variables
      }
    })

    return res

  } catch (error) {
    throw new Error('Failed to fetch API');
  }
}