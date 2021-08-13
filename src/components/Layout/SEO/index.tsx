import Head from 'next/head'
import { useRouter } from 'next/router'

import config from 'config'

type Props = {
  article?: boolean
  title: string
  description?: string
  previewImageUrl?: string
}

const SEO = ({ article, title, description, previewImageUrl }: Props) => {
  const {
    currentURL,
    originalTitle,
    originalImage,
    originalDescription,
    siteName,
  } = config
  const router = useRouter()

  const url = `${currentURL}${router.asPath}`
  const twitterImageUrl = `http://${previewImageUrl?.replace(
    /^https?:\/\//,
    ''
  )}`

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content={description ? description : originalDescription}
      />
      <meta
        name="image"
        content={previewImageUrl ? previewImageUrl : originalImage}
      />

      {/* Open Graph */}
      <meta property="og:url" content={url} key="ogurl" />
      <meta
        property="og:image"
        content={previewImageUrl ? previewImageUrl : originalImage}
        key="ogimage"
      />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      {article ? (
        <meta property="og:type" content="article" key="ogtype" />
      ) : (
        <meta property="og:type" content="website" key="ogtype" />
      )}
      <meta
        property="og:title"
        content={title ? title : originalTitle}
        key="ogtitle"
      />
      <meta
        property="og:description"
        content={description ? description : originalDescription}
        key="ogdesc"
      />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:creator" content="@momotrik" key="twhandle" />
      <meta
        name="twitter:title"
        content={`${title ? title : originalTitle}`}
        key="twtitle"
      />
      <meta
        name="twitter:description"
        content={`${description ? description : originalDescription}`}
        key="twdescription"
      />
      <meta
        name="twitter:image"
        content={`${previewImageUrl ? twitterImageUrl : originalImage}`}
        key="twimage"
      />
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      {/* disallow Twitter from using your site's info for personalization purposes */}
      <meta name="twitter:dnt" content="on" />

      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="theme-color" content="#000000" />
      <meta name="format-detection" content="telephone=no" />

      <title>{title}</title>
    </Head>
  )
}

export default SEO
