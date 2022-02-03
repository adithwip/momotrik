import type { DocumentContext } from 'next/document'

import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GTM_ID } from 'utils/gtm'

/**
 * We follow this guide for only trigger GA in Production env
 * Link: https://hoangtrinhj.com/using-google-analytics-with-next-js
 */
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    const { isDevelopment } = this.props

    return (
      <Html lang="id">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap"
            rel="stylesheet"
          />

          {/* Only run all Google Adsense and Tag Manager in Production Environment */}
          {!isDevelopment && (
            <>
              {/* Google AdSense script */}
              <script
                async
                data-ad-client="ca-pub-3226350239455992"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    (adsbygoogle = window.adsbygoogle || []).push({});
                  `,
                }}
              />

              {/* Google Tag Manager */}
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              </noscript>
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
