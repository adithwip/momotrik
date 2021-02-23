import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

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
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-screen-lg mx-auto p-4 bg-white md:p-5">
        <div className="flex justify-center items-center">
          {/*
            We need two images because of responsive needs
            Since it's not possible to inject style (with classNames)
            to Image component from Next.js (at the moment)
          */}
          <Link href="/">
            <a>
              <div className="hidden md:flex justify-center items-center">
                <Image
                  alt="Momotrik Logo Header"
                  src="/assets/logo/momotrik_logo_type_color_header.png"
                  width={325}
                  height={55}
                />
              </div>
              <div className="md:hidden flex justify-center items-center">
                <Image
                  alt="Momotrik Logo Header"
                  src="/assets/logo/momotrik_logo_type_color_header.png"
                  width={163}
                  height={28}
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
    {/* 
      In this first iteration
      we use max-w-screen-sm because we still not yet put any Ads.
      Once we put the Ads, change the max-width accordingly.
    */}
    <section className="max-w-screen-sm mx-auto px-4 py-6 md:py-8">
      {children}
    </section>
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </>
)

export default Layout
