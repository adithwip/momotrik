import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import sanitizeHtml from 'sanitize-html'

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
            __html: sanitizeHtml(post.content)
          }} />
      </article>
    </main>
  )
}

export default Article