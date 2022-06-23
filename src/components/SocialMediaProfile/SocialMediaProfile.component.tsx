import React from 'react'

import dynamic from 'next/dynamic'

const MobileSocialMediaProfile = dynamic(() => import('./mobile'))
const DesktopSocialMediaProfile = dynamic(() => import('./desktop'))

const SocialMediaProfile = () => {
  return (
    <>
      <DesktopSocialMediaProfile />
      <MobileSocialMediaProfile />
    </>
  )
}

export default SocialMediaProfile
