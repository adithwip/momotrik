import Image from 'next/image'
import Link from 'next/link'

import Ping from './Ping'

import styles from './Header.module.css'

interface Props {
  updating?: boolean
}

const Header = ({ updating }: Props) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-600 px-4">
      <div className="flex justify-center items-center py-4">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a className="flex items-center">
              <div className={styles.logoWrapper}>
                <Image
                  priority
                  alt="Momotrik Logo Header"
                  src="/assets/logo/momotrik_logo_type_color_header.png"
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
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
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