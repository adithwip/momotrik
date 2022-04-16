import clsx from 'clsx'

import FacebookIcon from './FacebookIcon'
import InstagramIcon from './InstagramIcon'
import TwitterIcon from './TwitterIcon'

import styles from './SocialMediaShareButton.module.css'

type Props = { facebook?: boolean; instagram?: boolean; twitter?: boolean }

const CURRENT_URL = window.location.href

const SocialMediaShareButton = ({
  facebook = false,
  instagram = false,
  twitter = false
}: Props) => {
  const handleFacebookShare = () => {
    const fbSharerUrl = `https://www.facebook.com/sharer/sharer.php?u=${CURRENT_URL}`

    window.open(fbSharerUrl, '_blank', 'noreferrer')
  }
  const handleTwitterShare = () => {
    const twShareUrl = `https://twitter.com/intent/tweet?url=${CURRENT_URL}`

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
          Bagikan artikel ke Facebook
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
          Bagikan artikel ke Twitter
        </>
      )}

    </button>
  )
}

export default SocialMediaShareButton
