import type { AppProps } from 'next/app'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { GTM_ID, pageview } from 'utils/gtm'

import 'tailwindcss/tailwind.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    if (isProduction) {
      router.events.on('routeChangeComplete', pageview)
      return () => {
        router.events.off('routeChangeComplete', pageview)
      }
    }
  }, [isProduction, router.events])

  return (
    <>
      {/* Only run Google Adsense and Tag Manager scripts in Production Environment */}
      {isProduction ? (
        <>
          {/* Google Tag Manager - Global base code */}
          <Script
            id="google-tag-manager-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
            `,
            }}
          />

          {/* Google Adsense scripts */}
          <Script
            id="google-adsense-pagead2-script"
            strategy="afterInteractive"
            data-ad-client="ca-pub-3226350239455992"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <Script
            id="google-adsense-script"
            dangerouslySetInnerHTML={{
              __html: `
              (adsbygoogle = window.adsbygoogle || []).push({});
            `,
            }}
          />
        </>
      ) : null}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
