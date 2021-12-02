import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import DesktopAuthor from './desktop/Author'
import DesktopAside from './desktop/DesktopAside'
import MobileAuthor from './mobile/Author'
import MobileAside from './mobile/MobileAside'
import SocialMediaShareButton from 'components/SocialMediaShareButton'

import styles from './Article.module.css'

type Props = {
  postData: GetSinglePostResponse
}

const Article = ({ postData }: Props) => {
  const { post } = postData

  return (
    <div className="flex flex-col md:flex-row">
      <article className="flex-2">
        <div className="ad-box-wrapper px-4 py-2">
          <div
            id="mobile-article-header-ad-box"
            className="md:hidden flex justify-center items-center rounded h-16 w-full"
          >
            <ins
              className="adsbygoogle"
              style={{
                display: 'inline-block',
                width: '100%',
                height: '64px',
              }}
              data-ad-client="ca-pub-3226350239455992"
              data-ad-slot="9437095680"
            />
          </div>
        </div>

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
            <div className="absolute z-10 bottom-0 p-5 pb-10 md:hidden">
              <h1 className={styles.mobileArticleTitle}>{post.title}</h1>
              <MobileAuthor postData={postData} />
            </div>
          </figure>

          <DesktopAuthor postData={postData} />
        </header>

        {/*
          // TODO: Remove this after no critical issue with react-markdown
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        */}
        <ReactMarkdown className={styles.content} rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>

        <div className="px-5 my-6">
          <SocialMediaShareButton />
        </div>
      </article>
      <DesktopAside />
      <MobileAside />
    </div>
  )
}

export default Article
