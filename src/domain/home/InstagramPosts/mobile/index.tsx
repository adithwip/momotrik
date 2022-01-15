import { useContext } from 'react'
import Image from 'next/image'

import { InstagramMediasContext } from '../index'
import SocialMediaShareButton from 'components/SocialMediaShareButton'

import { replaceInstagramCdnSubdomain } from 'utils/replaceInstagramCdnSubdomain'

import styles from './MobileInstagramPosts.module.css'

const MobileInstagramPosts = () => {
  const instagramMedias = useContext(InstagramMediasContext)

  return (
    <aside
      id="instagram-posts-desktop"
      className="px-4 md:hidden mb-16 order-3"
    >
      <p className="text-2xl font-semibold tracking-wider text-gray-900 mb-10 text-left">
        Instagram Momotrik
      </p>

      <div className="flex gap-4 overflow-x-auto">
        {instagramMedias.map(({ node }) => (
          <figure key={node.id} className={styles.figure}>
            <Image
              src={replaceInstagramCdnSubdomain(node.display_url)}
              alt={`Momotrik instagram post. With ID: ${node.id}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </figure>
        ))}
      </div>

      <div className="mt-10">
        <SocialMediaShareButton instagram />
      </div>
    </aside>
  )
}

export default MobileInstagramPosts
