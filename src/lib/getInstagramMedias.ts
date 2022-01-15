import type { GetInstagramMediasResponse } from 'interfaces/lib/getInstagramMedias'
import type { AxiosResponse } from 'axios'

import axios from 'axios'

const RAPID_API_KEY = process.env.RAPID_API_KEY

export const getInstagramMedias = async (): Promise<
  AxiosResponse<GetInstagramMediasResponse>
> => {
  try {
    const res = await axios({
      url: 'https://instagram28.p.rapidapi.com/medias',
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'instagram28.p.rapidapi.com',
        'x-rapidapi-key': RAPID_API_KEY as string,
      },
      params: {
        user_id: 44778586320, // Momotrik Instagram user_id,
        batch_size: 6,
      },
    })

    return res
  } catch (error) {
    throw new Error(`Error: GET Instragram medias: ${error}`)
  }
}
