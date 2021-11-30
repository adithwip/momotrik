import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import Image from 'next/image'

import SocialMediaShareButton from 'components/SocialMediaShareButton'
import DesktopAuthor from './desktop/Author'
import MobileAuthor from './mobile/Author'

import styles from './Article.module.css'

type Props = {
  postData: GetSinglePostResponse
}

const Article = ({ postData }: Props) => {
  const { post } = postData

  return (
    <>
      <article>
        <header>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <figure className={styles.featuredImageWrapper}>
            <Image
              priority
              alt="Article Header Image"
              src={post!.featuredImage!.node.mediaItemUrl}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="absolute z-10 bottom-0 p-5">
              <h1 className={styles.mobileArticleTitle}>{post.title}</h1>
              <MobileAuthor postData={postData} />
            </div>
          </figure>

          <div className={styles.divider}>
            <div />
          </div>

          <DesktopAuthor postData={postData} />
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="px-5 my-6">
        <SocialMediaShareButton />
      </div>
    </>
  )
}

export default Article
