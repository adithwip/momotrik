import type { RecentPostsEdge } from 'interfaces/lib/getRecentPosts.interface'

import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import { formatDate } from 'utils/formatDate'

import styles from './Footer.module.css'

interface Props {
  recentPostsData: RecentPostsEdge[] | undefined,
  slug?: string
}

const Footer = ({ recentPostsData, slug }: Props) => {
  const filteredRecentPostsData = recentPostsData?.filter(({ node }) => {
    return node.slug !== slug
  })

  return (
    <footer className={styles.footer}>
      <div className="flex flex-col md:flex-row justify-between max-w-screen md:max-w-screen-lg mx-auto py-16 px-5 h-full">

        <div className="flex-1 flex-col md:mr-20">
          <div className={styles.footerLogoWrapper}>
            <Image
              alt="Momotrik Logo White Footer"
              src="/assets/logo/momotrik_logo_type_white_footer.png"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </div>

          <div className="mt-7 mb-16">
            <p className="text-white text-sm text-center tracking-wide leading-normal mt-6 md:text-justify">
              Momotrik adalah media informasi yang membahas segala seluk beluk tentang mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal tentang gaya hidup kendaraan listrik terbaru
            </p>
          </div>

          <p className="text-xl text-white text-center font-bold md:text-left">
            Keep in touch
          </p>

          <div className="flex items-center justify-center md:justify-start">
            <a
              className="mt-7 text-white p-2 mr-4 rounded-lg bg-gray-600 w-8 h-8 flex justify-center items-center hover:bg-gray-700"
              href="https://www.instagram.com/momotrik.id/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.igIconWrapper}>
                <Image
                  alt="Instagram Icon White"
                  src="/assets/icons/instagram_white_glyph_icon.svg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={5}
                />
              </div>
            </a>
            <a
              className="mt-7 text-white p-2 rounded-lg bg-gray-600 w-8 h-8 flex justify-center items-center hover:bg-gray-700"
              href="https://www.facebook.com/momotrik.ID"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.fbIconWrapper}>
                <Image
                  alt="Facebook Icon White"
                  src="/assets/icons/facebook_white_glyph_icon.svg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={5}
                />
              </div>
            </a>
          </div>
        </div>

        <div className="flex-1 flex-col order-first mb-12 pb-12 border-b border-white md:border-transparent md:mb-0 md:order-1 md:ml-20 md:pb-0">
          {filteredRecentPostsData ? filteredRecentPostsData.map(({ node }, index, arr) => {

            // Prevent the current post to available in recent posts cards
            // And prevent to have more than 3 cards
            if (arr.length === 4 && index === 3) {
              return
            }

            return (
              <Fragment key={index}>
                {/* // TODO
                Make it reusable */}
                <Link href={`/article/${node.slug}`}>
                  <a>
                    <article className="flex items-center mb-4">
                      <div className="flex flex-col pr-5">
                        <p className="text-sm text-white font-bold leading-normal line-clamp-3">
                          {node.title}
                        </p>
                        <p className={styles.articleDate}>
                          {`${formatDate(node.date)} | ${node.author.node.name}`}
                        </p>
                      </div>

                      <div className={styles.smallArticleCardImageWrapper}>
                        <Image
                          alt={node.title}
                          src={node.featuredImage.node.mediaItemUrl}
                          sizes={node.featuredImage.node.sizes}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          quality={15}
                        />

                      </div>
                    </article>
                  </a>
                </Link>
              </Fragment>
            )
          }) : null}
          {/* // TODO */}
          {/* Create proper null condition component */}
        </div>

      </div>
    </footer>
  )
}

export default Footer
