import { useContext } from 'react'
import Image from 'next/image'

import { InstagramMediasContext } from '../index'
import SocialMediaShareButton from 'components/SocialMediaShareButton'

import { replaceInstagramCdnSubdomain } from 'utils/replaceInstagramCdnSubdomain'

const DesktopInstagramPosts = () => {
  const instagramMedias = useContext(InstagramMediasContext)

  return (
    <aside id="instagram-posts-desktop" className="mb-16 hidden py-4 md:block">
      <p className="mb-10 text-left text-2xl font-bold tracking-wide text-gray-900">
        Instagram Momotrik
      </p>

      <div className="w- grid grid-cols-3 gap-8">
        {instagramMedias.slice(0, 6).map(({ node }) => (
          <figure
            key={node.id}
            className="relative h-80 w-full overflow-hidden rounded bg-gray-200"
          >
            <Image
              src={replaceInstagramCdnSubdomain(node.display_url)}
              alt={`Momotrik instagram post. Url: ${node.display_url}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </figure>
        ))}
      </div>
      <div className="mx-auto mt-10 w-96">
        <SocialMediaShareButton instagram />
      </div>
    </aside>
  )
}

export default DesktopInstagramPosts
