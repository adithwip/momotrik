import Image from 'next/image'
import Link from 'next/link'

import Ping from './Ping'

interface Props {
  updating?: boolean
}

const Header = ({ updating }: Props) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-600 px-4">
      <div className="flex justify-center items-center py-4">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <a>
              <Image
                alt="Momotrik Logo Header"
                src="/assets/logo/momotrik_logo_type_color_header.png"
                width={163}
                height={28}
              />
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
          <Image
            alt="Hamburger Icon"
            src="/assets/icons/hamburger_menu_icon.svg"
            width={24}
            height={14}
          />
        </button>
      </div>
    </header>
  )
}

export default Header