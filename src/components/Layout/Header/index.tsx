import dynamic from 'next/dynamic'

const DesktopHeader = dynamic(() => import('./desktop'))
const MobileHeader = dynamic(() => import('./mobile'))

const Header = () => {
  return (
    <header>
      <MobileHeader />
      <DesktopHeader />
    </header>
  )
}

export default Header
