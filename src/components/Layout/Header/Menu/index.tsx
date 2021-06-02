import { Fragment, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import classnames from 'classnames'

import NavItem from '../NavItem'
import { useRouter } from 'next/router'

import navlinks from 'config/navlinks'
import styles from './Menu.module.css'

interface Props {
  show: boolean,
  onClose: () => void
}

const Menu = ({ show = false, onClose }: Props) => {
  const router = useRouter()

  // When query params change
  // Close the Menu
  // As when in client side, the Menu is not close
  // In menu items selection
  useEffect(() => {
    onClose()
  }, [router.query.name])

  return (
    <>
      <div onClick={onClose} className={classnames(styles.overlay, {
        [styles.overlayActive]: show
      })} />
      <div className={classnames(styles.hidBox, {
        [styles.active]: show
      })}>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center mb-4">
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

            <button
              onClick={onClose}
              type="button"
              className={styles.closeIcon}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Close mobile header menu</span>
              <div className={styles.closeWrapper}>
                <Image
                  priority
                  alt="Close Icon"
                  src="/assets/icons/close_icon.svg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
            </button>
          </div>
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
    </>
  )
}

export default Menu