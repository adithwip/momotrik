import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const NavItem = dynamic(() => import('../common/NavItem'))

import navlinks from 'config/navlinks'
import styles from './Header.module.css'

const DesktopHeader = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    router.push(`/search?q=${searchTerm}`)
  }

  return (
    <nav
      id="desktop-nav"
      className="hidden md:block fixed top-0 w-full z-50 bg-primary-main px-4"
    >
      <div className="relative flex justify-center items-center py-2 md:py-4 md:max-w-screen-lg md:mx-auto">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a>
              <figure className={styles.logoWrapper}>
                <Image
                  priority
                  alt="Momotrik Logo DesktopHeader"
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

        <div className="hidden md:block md:flex-1">
          <div className="flex items-center space-x-4 justify-center">
            {navlinks.map((link) => {
              return (
                <NavItem
                  key={link.label}
                  label={link.label}
                  href={{
                    pathname: link.pathname,
                    query: {
                      name: link.queryName,
                    },
                  }}
                />
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
                <figure className={styles.searchWrapper}>
                  <Image
                    priority
                    alt="Search Icon"
                    src="/assets/icons/search_icon.svg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </figure>
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DesktopHeader
