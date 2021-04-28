import { Fragment, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Ping = dynamic(() => import('./Ping'))
const NavItem = dynamic(() => import('./NavItem'))
const Menu = dynamic(() => import('./Menu'))

import navlinks from 'config/navlinks'
import styles from './Header.module.css'
interface Props {
  updating?: boolean
}

const Header = ({ updating }: Props) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-gray-900 px-4">
        <div className="flex justify-center items-center py-4 md:max-w-screen-lg md:mx-auto">
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
            <Ping />
          ) : null}

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navlinks.map(link => {
                return (
                  <Fragment key={link.queryName}>
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

          <button
            onClick={() => setShow(true)}
            type="button"
            className={styles.hamburgerMenu}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open mobile header menu</span>
            <div className={styles.menuWrapper}>
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

        </div>
      </nav>

      <Menu show={show} onClose={() => setShow(false)} />
    </>
  )
}

export default Header