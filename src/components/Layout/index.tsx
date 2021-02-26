import { ReactNode } from 'react'

import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {/* 
      In this first iteration
      we use max-w-screen-sm because we still not yet put any Ads.
      Once we put the Ads, change the max-width accordingly.
    */}
    <div className="max-w-screen-sm mx-auto px-4 py-6 md:py-8">
      {children}
    </div>
    <Footer />
  </>
)

export default Layout
