import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import sanitizeHtml, { defaults } from 'sanitize-html'

import Date from 'domain/article/Date'
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
          <h1 className="text-2xl text-gray-900 font-semibold leading-tight tracking-normal mb-3 md:text-4xl">{post.title}</h1>
        </header>
        <Date date={post.date} />

        
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.content, {
              /**
               * <img> tag is not allowed by default
               * so we need to adjust config and merged it with defaults
               * see here: https://github.com/apostrophecms/sanitize-html#default-options
               * 
               * From the lib maintainer:
               * "The syntax of poorly closed <p> and <img> elements is cleaned up."
               * 
               * So, basically content (by default) from WordPress
               * is claimed "poorly closed" by them LOL
               */
              allowedTags: [...defaults.allowedTags, 'img'],
              selfClosing: [...defaults.selfClosing, 'img'],
              allowedAttributes: {
                ...defaults.allowedAttributes,
                img: [
                  'data-attachment-id',
                  'data-permalink',
                  'data-orig-file',
                  'data-orig-size',
                  'data-comments-opened',
                  'data-image-meta',
                  'data-image-title',
                  'data-image-description',
                  'data-medium-file',
                  'data-large-file',
                  'loading',
                  'width',
                  'height',
                  'src',
                  'alt',
                  'srcset',
                  'sizes',
                  'data-recalc-dims'
                ]
              }
            })
          }} />
      </article>
    </main>
  )
}

export default Article