import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import Image from 'next/image'

import Date from 'domain/article/Date'
import SocialMediaShareButton from 'components/SocialMediaShareButton'

import styles from '../../Article.module.css'

type Props = {
  postData: GetSinglePostResponse
}

const DesktopAuthor = ({ postData }: Props) => {
  const { post } = postData

  return (
    <div className="hidden md:mt-6 md:flex md:flex-row md:items-center md:justify-between md:gap-2">
      <div className="flex flex-1 items-center">
        <figure className={styles.authorAvatarWrapper}>
          <Image
            priority
            alt="Author Avatar Image"
            src={post.author.node.avatar.url}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </figure>
        <div className="ml-4 flex flex-col">
          <p className="mb-2 text-sm font-bold tracking-wide text-gray-900">
            {post.author.node.name}
          </p>
          <Date date={post.date} />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-between gap-2">
        <SocialMediaShareButton facebook />
        <SocialMediaShareButton twitter />
      </div>
    </div>
  )
}

export default DesktopAuthor
