import type { Props } from './SocialMediaShareButton.types'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { FacebookIcon, InstagramIcon, TwitterIcon } from './Icons'

import styles from './SocialMediaShareButton.module.css'

const SocialMediaShareButton = ({
  facebook = false,
  instagram = false,
  twitter = false,
}: Props) => {
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const handleFacebookShare = () => {
    const fbSharerUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`

    window.open(fbSharerUrl, '_blank', 'noreferrer')
  }
  const handleTwitterShare = () => {
    const twShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`

    window.open(twShareUrl, '_blank', 'noreferrer')
  }
  const handleInstagramRedirection = () => {
    window.open(
      'https://www.instagram.com/momotrik.id/',
      '_blank',
      'noreferrer'
    )
  }

  const handleClick = () => {
    if (facebook) {
      handleFacebookShare()
    } else if (instagram) {
      handleInstagramRedirection()
    } else if (twitter) {
      handleTwitterShare()
    } else {
      return
    }
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={clsx(
        styles.button,
        facebook && styles.facebook,
        instagram && styles.instagram,
        twitter && styles.twitter,
        'md:transition-all md:hover:scale-105'
      )}
    >
      <span className="sr-only">Button for Facebook social sharing</span>
      {facebook && (
        <>
          <FacebookIcon />
          Share ke Facebook
        </>
      )}
      {instagram && (
        <>
          <InstagramIcon />
          Follow Momotrik di Instagram
        </>
      )}
      {twitter && (
        <>
          <TwitterIcon />
          Share ke Twitter
        </>
      )}
    </button>
  )
}

export default SocialMediaShareButton
