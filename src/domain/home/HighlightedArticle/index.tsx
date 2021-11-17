import type { AllPostsEdge } from 'interfaces/lib/getAllPosts.interface'

import dynamic from 'next/dynamic'

const DesktopHighlightedArticle = dynamic(() => import('./desktop'))
const MobileHighlightedArticle = dynamic(() => import('./mobile'))

import { useMediaQueries } from 'hooks/useMediaQueries'

interface Props {
  data: AllPostsEdge[]
}

const HighlightedArticle = ({ data }: Props) => {
  const { isMobile, isDesktop } = useMediaQueries()

  return (
    <>
      {isDesktop && <DesktopHighlightedArticle data={data} />}
      {isMobile && <MobileHighlightedArticle data={data} />}
    </>
  )
}

export default HighlightedArticle
