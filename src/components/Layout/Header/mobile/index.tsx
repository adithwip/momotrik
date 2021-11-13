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
        className="md:hidden fixed top-0 w-full z-50 bg-black px-4"
      >
        <div className="relative flex justify-center items-center py-2 md:py-4 md:max-w-screen-lg md:mx-auto">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a>
                <div className={styles.logoWrapper}>
                  <Image
                    priority
                    alt="Momotrik Logo MobileHeader"
                    src="/assets/logo/momotrik_header_logo_white_blue.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    quality={25}
                  />
                </div>
              </a>
            </Link>
          </div>

          {/* 📱 Only showed on mobile view 📱 */}
          <button
            onClick={() => router.push(`/search`)}
            type="button"
            className={styles.mobileNavigationMenu}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Mobile search for article searching</span>
            <div className={styles.mobileSearchWrapper}>
              <Image
                priority
                alt="Mobile Search Icon"
                src="/assets/icons/search_icon_white.svg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </button>
          <button
            onClick={() => setShow(true)}
            type="button"
            className={styles.mobileNavigationMenu}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open mobile header menu</span>
            <div className={styles.hamburgerMenuWrapper}>
              <Image
                priority
                alt="Hamburger Icon"
                src="/assets/icons/hamburger_menu_icon.svg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </button>
          {/* 📱 Only showed on mobile view 📱 */}
        </div>
      </nav>

      <Menu show={show} onClose={() => setShow(false)} />
    </>
  )
}

export default MobileHeader
