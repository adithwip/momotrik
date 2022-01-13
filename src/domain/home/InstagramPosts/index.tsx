import type { Edge } from 'interfaces/lib/getInstagramMedias'

import * as React from 'react'
import DesktopInstagramPosts from './desktop'

type Props = {
  instagramMedias: Edge[]
}

export const InstagramMediasContext = React.createContext([] as Edge[])

const InstagramPosts = ({ instagramMedias }: Props) => {
  return (
    <InstagramMediasContext.Provider value={instagramMedias}>
      <DesktopInstagramPosts />
    </InstagramMediasContext.Provider>
  )
}

export default InstagramPosts
