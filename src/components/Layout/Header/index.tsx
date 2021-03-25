import Image from 'next/image'
import Link from 'next/link'

import Ping from './Ping'
import NavItem from './NavItem'

import styles from './Header.module.css'
interface Props {
  updating?: boolean
}

const Header = ({ updating }: Props) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900 px-4">
      <div className="flex justify-center items-center py-2 md:py-4 md:max-w-screen-lg md:mx-auto">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a className="flex items-center">
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

        <nav className="hidden md:block">
          <div className="flex items-center space-x-4">
            <NavItem label="Mobil" href={`/category/mobil-listrik`} />
          </div>
        </nav>

        <button
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
              quality={25}
            />
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header