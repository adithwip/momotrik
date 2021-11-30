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
    <div className="hidden md:flex md:flex-row md:justify-between md:items-center md:my-2">
      <div className="flex items-center px-5 mt-8">
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
        <div className="flex flex-col ml-4">
          <p className="text-sm font-semibold text-gray-900 tracking-normal mb-2">
            {post.author.node.name}
          </p>
          <Date date={post.date} />
        </div>
      </div>

      <div className="hideen px-5 mt-6">
        <SocialMediaShareButton />
      </div>
    </div>
  )
}

export default DesktopAuthor
