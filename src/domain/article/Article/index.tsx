import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import sanitizeHtml from 'sanitize-html'

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
          <h1 className="text-4xl text-gray-900 font-bold leading-normal tracking-wide mb-8">{post.title}</h1>
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.content)
          }} />
      </article>
    </main>
  )
}

export default Article