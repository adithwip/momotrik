import { ReactNode } from 'react'

import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

type Props = {
  children: ReactNode
  title: string
  description?: string,
  previewImageUrl?: string,
  pathUrl?: string,
  updating?: boolean,
}

const Layout = ({
  children,
  title,
  description,
  previewImageUrl,
  pathUrl,
  updating
}: Props) => {
  const url = `https://momotrik.com${pathUrl ? pathUrl : ''}`

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:image" content={previewImageUrl} key="ogimage" />
        <meta property="og:site_name" content="Momotrik" key="ogsitename" />
        <meta property="og:type" content="article" key="ogtype" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />

        <title>{title}</title>
      </Head>
      <Header updating={updating} />
      {/* 
      In this first iteration
      we use max-w-screen-sm because we still not yet put any Ads.
      Once we put the Ads, change the max-width accordingly.
    */}
      <div className="max-w-screen-sm min-h-screen mx-auto">
        {children}
      </div>
      <Footer />
    </>

  )
}

export default Layout
