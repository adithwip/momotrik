import dynamic from 'next/dynamic'

const DesktopPopularPosts = dynamic(() => import('./desktop'))
const MobilepPopularPosts = dynamic(() => import('./mobile'))

import { useMediaQueries } from 'hooks/useMediaQueries'

const PopularPosts = () => {
  const { isMobile, isDesktop } = useMediaQueries()

  return (
    <>
      {isDesktop && <DesktopPopularPosts />}
      {isMobile && <MobilepPopularPosts />}
    </>
  )
}

export default PopularPosts
