import dynamic from 'next/dynamic'

const DesktopHeader = dynamic(() => import('./desktop'))
const MobileHeader = dynamic(() => import('./mobile'))

import { useMediaQueries } from 'hooks/useMediaQueries'

const Header = () => {
  const { isMobile, isDesktop } = useMediaQueries()

  return (
    <header>
      {isMobile && <MobileHeader />}
      {isDesktop && <DesktopHeader />}
    </header>
  )
}

export default Header
