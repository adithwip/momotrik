import { useContext } from 'react'
import Image from 'next/image'

import { InstagramMediasContext } from '../index'

const DesktopInstagramPosts = () => {
  const instagramMedias = useContext(InstagramMediasContext)

  return (
    <aside id="instagram-posts-desktop" className="py-4 hidden md:block mb-16">
      <p className="text-2xl font-semibold tracking-wider text-gray-900 mb-10 text-left">
        Instagram Momotrik
      </p>

      <div className="grid grid-cols-3 gap-8">
        {instagramMedias.slice(0, 6).map(({ node }) => (
          <figure
            key={node.id}
            className="relative bg-gray-200 rounded overflow-hidden h-80 w-full"
          >
            <Image
              className="object-cover"
              src={node.display_url}
              alt={`Momotrik instagram post. With ID: ${node.id}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </figure>
        ))}
      </div>
    </aside>
  )
}

export default DesktopInstagramPosts
