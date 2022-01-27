import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import DesktopAuthor from './desktop/Author'
import DesktopAside from './desktop/DesktopAside'
import MobileAuthor from './mobile/Author'
import MobileAside from './mobile/MobileAside'
import SocialMediaShareButton from 'components/SocialMediaShareButton'

import { useGetTrendingPosts } from 'lib/useGetTrendingPosts'
import { useGetRecentPosts } from 'lib/useGetRecentPosts'
import { parseAndSplitHTMLString } from './utils'

import styles from './Article.module.css'

type Props = {
  postData: GetSinglePostResponse
}

const Article = ({ postData }: Props) => {
  const { getRecentPostsData } = useGetRecentPosts()
  const {
    post: { content, slug, title, featuredImage },
  } = postData
  const {
    getTrendingPostsData: { data },
  } = useGetTrendingPosts()

  const filteredRecentPostsData = getRecentPostsData.data?.posts.edges?.filter(
    ({ node }) => {
      return node.slug !== slug
    }
  )
  const filteredTrendingPostsData = data?.posts.edges.filter(
    ({ node }) => node.slug !== slug
  )

  const { firstHalf, secondHalf } = parseAndSplitHTMLString(content)

  return (
    <div className="flex flex-col md:flex-row">
      <article className={styles.article}>
        <div className="ad-box-wrapper px-4 py-2">
          <div
            id="mobile-article-header-ad-box"
            className="flex h-16 w-full items-center justify-center rounded md:hidden"
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

        <header className="mb-6">
          <h1 className={styles.articleTitle}>{title}</h1>
          <figure className={styles.featuredImageWrapper}>
            <Image
              priority
              alt="Article Header Image"
              src={featuredImage.node.mediaItemUrl}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="absolute bottom-0 z-10 p-5 pb-10 md:hidden">
              <h1 className={styles.mobileArticleTitle}>{title}</h1>
              <MobileAuthor postData={postData} />
            </div>
          </figure>

          <DesktopAuthor postData={postData} />
        </header>

        <ReactMarkdown className={styles.content} rehypePlugins={[rehypeRaw]}>
          {firstHalf}
        </ReactMarkdown>
        <ul className="flex list-outside list-disc flex-col gap-4 py-4 px-5 pl-10">
          {filteredRecentPostsData?.map(({ node }, index) => {
            if (index > 2) return null

            return (
              <li key={index}>
                <Link href={`/artikel/${node.slug}`}>
                  <a className="text-base font-semibold leading-normal text-blue-600 line-clamp-3">
                    {node.title}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
        <ReactMarkdown className={styles.content} rehypePlugins={[rehypeRaw]}>
          {secondHalf}
        </ReactMarkdown>

        <div className="my-6 px-5">
          <SocialMediaShareButton facebook />
        </div>
      </article>
      <DesktopAside data={filteredTrendingPostsData} />
      <MobileAside data={filteredTrendingPostsData} />
    </div>
  )
}

export default Article
