import type { AllPostsEdge } from 'interfaces/lib/getAllPosts.interface'

import dynamic from 'next/dynamic'

const DesktopHighlightedArticle = dynamic(() => import('./desktop'))
const MobileHighlightedArticle = dynamic(() => import('./mobile/'))

interface Props {
  data: AllPostsEdge[]
}

const HighlightedArticle = ({ data }: Props) => {
  return (
    <>
      <DesktopHighlightedArticle data={data} />
      <MobileHighlightedArticle data={data} />
    </>
  )
}

export default HighlightedArticle
