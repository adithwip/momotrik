import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import Image from 'next/image'
import sanitizeHtml, { defaults } from 'sanitize-html'

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
          <h1 className={styles.articleTitle}>
            {post.title}
          </h1>

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
          dangerouslySetInnerHTML={{
            // __html: sanitizeHtml(post.content, {
            //   /**
            //    * <img> tag is not allowed by default
            //    * so we need to adjust config and merged it with defaults
            //    * see here: https://github.com/apostrophecms/sanitize-html#default-options
            //    * 
            //    * From the lib maintainer:
            //    * "The syntax of poorly closed <p> and <img> elements is cleaned up."
            //    * 
            //    * So, basically content (by default) from WordPress
            //    * is claimed "poorly closed" by them LOL
            //    */
            //   allowedTags: [...defaults.allowedTags, 'img'],
            //   selfClosing: [...defaults.selfClosing, 'img'],
            //   allowedAttributes: {
            //     ...defaults.allowedAttributes,
            //     img: [
            //       'data-attachment-id',
            //       'data-permalink',
            //       'data-orig-file',
            //       'data-orig-size',
            //       'data-comments-opened',
            //       'data-image-meta',
            //       'data-image-title',
            //       'data-image-description',
            //       'data-medium-file',
            //       'data-large-file',
            //       'loading',
            //       'width',
            //       'height',
            //       'src',
            //       'alt',
            //       'srcset',
            //       'sizes',
            //       'data-recalc-dims'
            //     ],
            //     figure: ['class']
            //   }
            // })
            __html: post.content
          }} />
      </article>

      <div className="px-5 my-6">
        <SocialMediaShareButton />
      </div>
    </main>
  )
}

export default Article