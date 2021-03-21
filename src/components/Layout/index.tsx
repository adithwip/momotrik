import { ReactNode } from 'react'

import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'

type Props = {
  children: ReactNode,
  article?: boolean,
  title: string
  description?: string,
  previewImageUrl?: string,
  pathUrl?: string,
  updating?: boolean,
  screen?: 'md' | 'lg'
}

const Layout = ({
  children,
  article = false,
  title,
  description,
  previewImageUrl,
  updating,
  screen = 'lg'
}: Props) => {
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
      <div className={`max-w-screen-sm min-h-screen mt-12 md:mt-16 mx-auto md:max-w-screen-${screen}`}>
        {children}
      </div>
      <Footer />
    </>

  )
}

export default Layout
