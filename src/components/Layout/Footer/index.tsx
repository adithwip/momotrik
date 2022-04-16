import type { RecentPostsEdge } from 'interfaces/lib/getRecentPosts.interface'

import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import { formatDate } from 'utils/formatDate'

import styles from './Footer.module.css'

interface Props {
  recentPostsData: RecentPostsEdge[] | undefined
  slug?: string
}

const Footer = ({ recentPostsData, slug }: Props) => {
  const filteredRecentPostsData = recentPostsData?.filter(({ node }) => {
    return node.slug !== slug
  })

  return (
    <footer className={styles.footer}>
      <div className="max-w-screen mx-auto flex h-full flex-col justify-between py-16 px-5 md:max-w-screen-lg md:flex-row">
        <div className="flex-1 flex-col md:mr-20">
          <figure className={styles.footerLogoWrapper}>
            <Image
              alt="Momotrik Logo White Footer"
              src="/assets/logo/momotrik_logo_type_white_footer.png"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </figure>

          <div className="mt-7 mb-16">
            <p className="mt-6 text-center text-sm leading-normal tracking-wide text-white md:text-justify">
              Momotrik adalah media informasi yang membahas segala seluk beluk
              tentang mobil listrik, motor listrik, dan skuter listrik. Serta
              beragam hal tentang gaya hidup kendaraan listrik terbaru
            </p>
          </div>

          <p className="text-center text-xl font-bold text-white md:text-left">
            Keep in touch
          </p>

          <div className="flex items-center justify-center md:justify-start">
            <a
              className="mt-7 mr-4 flex h-8 w-8 items-center justify-center rounded bg-gray-600 p-2 text-white hover:bg-gray-700"
              href="https://www.instagram.com/momotrik.id/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className={styles.igIconWrapper}>
                <Image
                  alt="Instagram Icon White"
                  src="/assets/icons/instagram_white_glyph_icon.svg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={5}
                />
              </figure>
            </a>
            <a
              className="mt-7 flex h-8 w-8 items-center justify-center rounded bg-gray-600 p-2 text-white hover:bg-gray-700"
              href="https://www.facebook.com/momotrik.ID"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className={styles.fbIconWrapper}>
                <Image
                  alt="Facebook Icon White"
                  src="/assets/icons/facebook_white_glyph_icon.svg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={5}
                />
              </figure>
            </a>
          </div>
        </div>

        <div className="order-first mb-12 flex-1 flex-col border-b border-white pb-12 md:order-1 md:mb-0 md:ml-20 md:border-transparent md:pb-0">
          {filteredRecentPostsData?.map(({ node }, index) => {
            return (
              <Fragment key={index}>
                <Link href={`/artikel/${node.slug}`}>
                  <a>
                    <article className="mb-4 flex items-center">
                      <div className="flex flex-col pr-5">
                        <p className="text-sm font-bold leading-normal text-white line-clamp-3">
                          {node.title}
                        </p>
                        <p className={styles.articleDate}>
                          {`${formatDate(node.date)} | ${
                            node.author.node.name
                          }`}
                        </p>
                      </div>

                      <figure className={styles.smallArticleCardImageWrapper}>
                        <Image
                          alt={node.title}
                          src={node.featuredImage.node.mediaItemUrl}
                          sizes={node.featuredImage.node.sizes}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          quality={15}
                        />
                      </figure>
                    </article>
                  </a>
                </Link>
              </Fragment>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
