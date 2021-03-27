import Link from 'next/link'


interface Props {
  label: string,
  href: {
    pathname: string,
    query: {
      [key: string]: string
    }
  }
}

import styles from './NavItem.module.css'

const NavItem = ({ label, href }: Props) => {
  return (
    <Link href={href}>
      <a className={styles.navItem}>
        {label}
      </a>
    </Link>
  )
}

export default NavItem