import type { Edge } from 'interfaces/lib/getInstagramMedias'

import * as React from 'react'
import DesktopInstagramPosts from './desktop'
import MobileInstagramPosts from './mobile'

type Props = {
  instagramMedias: Edge[]
}

export const InstagramMediasContext = React.createContext([] as Edge[])

const InstagramPosts = ({ instagramMedias }: Props) => {
  return (
    <InstagramMediasContext.Provider value={instagramMedias}>
      {/* <DesktopInstagramPosts /> */}
      <MobileInstagramPosts />
    </InstagramMediasContext.Provider>
  )
}

export default InstagramPosts
