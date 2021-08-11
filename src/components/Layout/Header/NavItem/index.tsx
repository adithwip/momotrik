import Link from 'next/link'


interface Props {
  label: string,
  href: {
    pathname: string,
    query?: {
      [key: string]: string | null
    }
  }
}

import styles from './NavItem.module.css'

const NavItem = ({ label, href }: Props) => {
const finalHref = href.query?.name ? href : href.pathname

  return (
    <Link href={finalHref}>
      <a className={styles.navItem}>
        {label}
      </a>
    </Link>
  )
}

export default NavItem