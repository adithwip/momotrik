import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import NavItem from '../../../common/NavItem'

import navlinks from 'config/navlinks'
import styles from './Menu.module.css'

interface Props {
  show: boolean
  onClose: () => void
}

const Menu = ({ show = false, onClose }: Props) => {
  return (
    <>
      <div
        role="button"
        onClick={onClose}
        className={clsx(styles.overlay, show && styles.overlayActive)}
      />
      <div className={clsx(styles.hidBox, show && styles.active)}>
        <div className="flex flex-col justify-between space-y-4 h-full">
          <Link href="/">
            <a>
              <figure className={styles.logoWrapper}>
                <Image
                  priority
                  alt="Momotrik Logo Header"
                  src="/assets/logo/momotrik_header_logo_white_blue.png"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={25}
                />
              </figure>
            </a>
          </Link>

          <nav className="flex flex-col gap-4">
            {navlinks.map((link) => {
              return (
                <Fragment key={link.label}>
                  <NavItem
                    label={link.label}
                    href={{
                      pathname: link.pathname,
                      query: {
                        name: link.queryName,
                      },
                    }}
                  />
                </Fragment>
              )
            })}
          </nav>

          <button
            onClick={onClose}
            type="button"
            className={styles.closeIcon}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Close mobile header menu</span>
            <figure className={styles.closeWrapper}>
              <Image
                priority
                alt="Close Icon"
                src="/assets/icons/close_icon.svg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </figure>
          </button>
        </div>
      </div>
    </>
  )
}

export default Menu
