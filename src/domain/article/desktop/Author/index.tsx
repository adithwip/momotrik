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
    <div className="hidden md:my-2 md:flex md:flex-row md:items-center md:justify-between">
      <div className="mt-8 flex items-center px-5">
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
          <p className="mb-2 text-sm font-semibold tracking-normal text-gray-900">
            {post.author.node.name}
          </p>
          <Date date={post.date} />
        </div>
      </div>

      <div className="hideen mt-6 px-5">
        <SocialMediaShareButton facebook />
      </div>
    </div>
  )
}

export default DesktopAuthor
