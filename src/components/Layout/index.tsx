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
    <header className="sticky top-0 z-50 bg-white shadow-lg px-4">
      <div className="flex justify-center items-center py-4">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <Image
              alt="Momotrik Logo Header"
              src="/assets/logo/momotrik_logo_type_color_header.png"
              width={163}
              height={28}
            />
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open mobile header menu</span>
          <Image
            alt="Hamburger Icon"
            src="/assets/icons/hamburger_menu_icon.svg"
            width={24}
            height={14}
          />
        </button>
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
