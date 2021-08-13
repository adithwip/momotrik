import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import Image from 'next/image'

import Date from 'domain/article/Date'
import SocialMediaShareButton from 'components/SocialMediaShareButton'
import styles from './Article.module.css'

type Props = {
  postData: GetSinglePostResponse
}

const Article = ({ postData }: Props) => {
  const { post } = postData

  return (
    <main>
      <article>
        <header>
          <h1 className={styles.articleTitle}>{post.title}</h1>

          <div className={styles.featuredImageWrapper}>
            <Image
              priority
              alt="Article Header Image"
              src={post!.featuredImage!.node.mediaItemUrl}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>

          <div className={styles.divider}>
            <div />
          </div>

          <div className="flex flex-col md:flex md:flex-row md:justify-between md:items-center md:my-2">
            <div className="flex items-center px-5 mt-8">
              <div className={styles.authorAvatarWrapper}>
                <Image
                  priority
                  alt="Author Avatar Image"
                  src={post.author.node.avatar.url}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="flex flex-col ml-4">
                <p className="text-sm font-bold text-gray-900 tracking-normal mb-2">
                  {post.author.node.name}
                </p>
                <Date date={post.date} />
              </div>
            </div>

            <div className="px-5 mt-6">
              <SocialMediaShareButton />
            </div>
          </div>
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="px-5 my-6">
        <SocialMediaShareButton />
      </div>
    </main>
  )
}

export default Article
