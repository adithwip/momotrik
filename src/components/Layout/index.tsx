import { ReactNode } from 'react'

import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

type Props = {
  children?: ReactNode
  title?: string
  updating?: boolean
}

const Layout = ({ children, title = 'This is the default title', updating }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header updating={updating} />
    {/* 
      In this first iteration
      we use max-w-screen-sm because we still not yet put any Ads.
      Once we put the Ads, change the max-width accordingly.
    */}
    <div className="max-w-screen-sm mx-auto">
      {children}
    </div>
    <Footer />
  </>
)

export default Layout
