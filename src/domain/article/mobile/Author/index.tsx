import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import Image from 'next/image'

import { formatDate } from 'utils/formatDate'
import styles from './MobileAuthor.module.css'

type Props = {
  postData: GetSinglePostResponse
}

const MobileAuthor = ({ postData }: Props) => {
  const { post } = postData

  return (
    <div className="flex items-center justify-between md:hidden">
      <figure className={styles.mobileAuthorAvatarWrapper}>
        <Image
          priority
          alt="Author Avatar Image"
          src={post.author.node.avatar.url}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </figure>
      <div className="flex-1">
        <span className="ml-4 text-sm text-white">{`${post.author.node.name} — `}</span>
        <time className="text-sm text-white" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </div>
    </div>
  )
}

export default MobileAuthor
