import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Menu = dynamic(() => import('./components/Menu'))

import styles from './Header.module.css'

const MobileHeader = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)

  // When query params change
  // Close the Menu
  // As when in client side, the Menu is not close
  // In menu items selection
  useEffect(() => {
    setShow(false)
  }, [router.query.name])

  return (
    <>
      {/* Prevent body scrolling when Menu is shown in Mobile view */}
      <style jsx global>{`
        body {
          overflow: ${show ? 'hidden' : 'visible'};
        }
      `}</style>
      <nav
        id="mobile-nav"
        className="fixed top-0 z-50 h-16 w-full bg-primary-main px-4 md:hidden"
      >
        <div className="relative flex h-full items-center justify-center">
          <button
            onClick={() => setShow(true)}
            type="button"
            className={styles.mobileNavigationMenu}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open mobile header menu</span>
            <figure className={styles.hamburgerMenuWrapper}>
              <Image
                priority
                alt="Hamburger Icon"
                src="/assets/icons/hamburger_menu_icon.svg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </figure>
          </button>

          <div className="flex flex-1 items-center justify-center">
            <Link href="/">
              <a>
                <figure className={styles.logoWrapper}>
                  <Image
                    priority
                    alt="Momotrik Logo MobileHeader"
                    src="/assets/logo/momotrik_header_logo_white_blue.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    quality={25}
                  />
                </figure>
              </a>
            </Link>
          </div>

          <button
            onClick={() => router.push(`/search`)}
            type="button"
            className={styles.mobileNavigationMenu}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Mobile search for article searching</span>
            <figure className={styles.mobileSearchWrapper}>
              <Image
                priority
                alt="Mobile Search Icon"
                src="/assets/icons/search_icon_white.svg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </figure>
          </button>
        </div>
      </nav>

      <Menu show={show} onClose={() => setShow(false)} />
    </>
  )
}

export default MobileHeader
