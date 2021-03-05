import { ReactNode } from 'react'

import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

import config from 'config'

type Props = {
  children: ReactNode,
  article?: boolean,
  title: string
  description?: string,
  previewImageUrl?: string,
  pathUrl?: string,
  updating?: boolean,
}

const Layout = ({
  children,
  article = false,
  title,
  description,
  previewImageUrl,
  pathUrl,
  updating
}: Props) => {
  const {
    currentURL,
    originalTitle,
    originalImage,
    originalDescription,
    siteName
  } = config
  const url = `${currentURL}${pathUrl ? pathUrl : ''}`
  const twitterImageUrl = `http://${previewImageUrl?.replace(/^https?:\/\//,'')}`

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description ? description : originalDescription} />
        <meta name="image" content={previewImageUrl ? previewImageUrl : originalImage} />

        {/* Open Graph */}
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="og:image" content={previewImageUrl ? previewImageUrl : originalImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        {article ? (
          <meta property="og:type" content="article" key="ogtype" />
        ) : (
            <meta property="og:type" content="website" key="ogtype" />
          )}
        <meta property="og:title" content={title ? title : originalTitle} key="ogtitle" />
        <meta property="og:description" content={description ? description : originalDescription} key="ogdesc" />

        {/* Twitter */}
        <meta name="twitter:creator" content="momotrik" key="twhandle" />
        <meta name="twitter:title" content={`${title ? title : originalTitle}`} key="twtitle" />
        <meta name="twitter:description" content={`${description ? description : originalDescription}`} key="twdescription" />
        <meta name="twitter:image" content={`${previewImageUrl ? twitterImageUrl : originalImage}`} key="twimage" />

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
