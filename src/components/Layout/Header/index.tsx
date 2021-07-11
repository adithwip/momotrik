import { Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const RefreshSpin = dynamic(() => import('./RefreshSpin'))
const NavItem = dynamic(() => import('./NavItem'))
const Menu = dynamic(() => import('./Menu'))

import navlinks from 'config/navlinks'
import styles from './Header.module.css'
interface Props {
  updating?: boolean
}

const Header = ({ updating }: Props) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // When query params change
  // Close the Menu
  // As when in client side, the Menu is not close
  // In menu items selection
  useEffect(() => {
    setShow(false)
  }, [router.query.name])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    router.push(`/search?q=${searchTerm}`)
  }

  return (
    <>
      {/* Prevent body scrolling when Menu is shown in Mobile view */}
      <style jsx global>{`
        body {
          overflow: ${show ? 'hidden' : 'visible'};
        }
      `}</style>
      <nav className="fixed top-0 w-full z-50 bg-black px-4">
        <div className="relative flex justify-center items-center py-2 md:py-4 md:max-w-screen-lg md:mx-auto">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a>
                <div className={styles.logoWrapper}>
                  <Image
                    priority
                    alt="Momotrik Logo Header"
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
          {updating ? (
            <RefreshSpin />
          ) : null}

          {/* Only showed on Desktop view */}
          <div className="hidden md:block md:flex-1">
            <div className="flex items-center space-x-4 justify-center">
              {navlinks.map((link) => {
                return (
                  <Fragment key={link.label}>
                    <NavItem label={link.label} href={{
                      pathname: link.pathname,
                      query: {
                        name: link.queryName
                      }
                    }} />
                  </Fragment>
                )
              })}
            </div>
          </div>

          <div className="hidden md:block md:flex-1">
            <div className="flex justify-end text-white">
              <form
                onSubmit={handleSearch}
                className="flex relative justify-center items-center"
              >
                <input
                  required
                  className={styles.search}
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari artikel..."
                  aria-label="Search article in momotrik"
                />

                <button
                  type="submit"
                  className={styles.searchButton}
                  aria-controls="search"
                  aria-expanded="false"
                >
                  <span className="sr-only">Search article in momotrik</span>
                  <div className={styles.searchWrapper}>
                    <Image
                      priority
                      alt="Search Icon"
                      src="/assets/icons/search_icon.svg"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Only showed on Desktop view */}

          {/* Only showed on mobile view */}
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
          {/* Only showed on mobile view */}

        </div>
      </nav>

      <Menu show={show} onClose={() => setShow(false)} />
    </>
  )
}

export default Header