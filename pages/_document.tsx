import type { DocumentContext } from 'next/document'

import { Fragment } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from 'utils/gtag'

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

          {/* Only run all Google Analytics trackers in Production Environment */}
          {!isDevelopment && (
            <Fragment>
              {/* Global site tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', '${GA_TRACKING_ID}');
                  `
                }}
              />
            </Fragment>
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