import dynamic from 'next/dynamic'

const DesktopPopularPosts = dynamic(() => import('./desktop'))
const MobilepPopularPosts = dynamic(() => import('./mobile'))

const PopularPosts = () => {
  return (
    <>
      <DesktopPopularPosts />
      <MobilepPopularPosts />
    </>
  )
}

export default PopularPosts
