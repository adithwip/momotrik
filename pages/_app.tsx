import type { AppProps } from 'next/app'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'

import { GTM_ID, pageview } from 'utils/gtm'

import 'tailwindcss/tailwind.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      router.events.on('routeChangeComplete', pageview)
      return () => {
        router.events.off('routeChangeComplete', pageview)
      }
    }
  }, [router.events])

  return (
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
