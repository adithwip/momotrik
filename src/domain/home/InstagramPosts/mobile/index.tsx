import { useContext } from 'react'
import Image from 'next/image'

import { InstagramMediasContext } from '../index'
import SocialMediaShareButton from 'components/SocialMediaShareButton'

import { replaceInstagramCdnSubdomain } from 'utils/replaceInstagramCdnSubdomain'

import styles from './MobileInstagramPosts.module.css'

const MobileInstagramPosts = () => {
  const instagramMedias = useContext(InstagramMediasContext)

  return (
    <aside id="instagram-posts-mobile" className="order-3 px-4 py-10 md:hidden">
      <p className="mb-10 text-left text-2xl font-bold tracking-wide text-gray-900">
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
