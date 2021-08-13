import { ReactNode } from 'react'
import classnames from 'classnames'

import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'

import { useGetRecentPosts } from 'lib/useGetRecentPosts'

import styles from './Layout.module.css'

type Props = {
  children: ReactNode
  article?: boolean
  title: string
  description?: string
  previewImageUrl?: string
  pathUrl?: string
  updating?: boolean
  screen?: 'md' | 'lg'
  slug?: string
}

const Layout = ({
  children,
  article = false,
  title,
  description,
  previewImageUrl,
  updating,
  screen = 'lg',
  slug,
}: Props) => {
  const { getRecentPostsData } = useGetRecentPosts()

  return (
    <>
      <SEO
        article={article}
        title={title}
        description={description}
        previewImageUrl={previewImageUrl}
      />
      <Header updating={updating} />
      {/* 
          In this first iteration
          we use max-w-screen-sm because we still not yet put any Ads.
          Once we put the Ads, change the max-width accordingly.
        */}
      <div
        className={classnames(
          styles.mainLayout,
          `max-w-screen-sm min-h-screen mx-auto md:max-w-screen-${screen}`
        )}
      >
        {children}
      </div>
      <Footer
        slug={slug}
        recentPostsData={getRecentPostsData.data?.posts.edges}
      />
    </>
  )
}

export default Layout
