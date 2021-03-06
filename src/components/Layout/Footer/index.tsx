import Image from 'next/image'

import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="flex flex-col justify-center items-center h-full">

        <div className={styles.footerLogoWrapper}>
          <Image
            alt="Momotrik Logo White Footer"
            src="/assets/logo/momotrik_logo_type_white_footer.png"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={25}
          />
        </div>

        <div className="max-w-sm mx-auto">
          <p className="text-white text-sm text-justify tracking-wide leading-normal mt-6">
            Momotrik adalah media informasi yang membahas segala seluk beluk tentang mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal tentang gaya hidup kendaraan listrik terbaru
          </p>
        </div>

        <div className="flex justify-center items-center mt-8">
          <div className={styles.igIconWrapper}>
            <Image
              alt="Instagram Icon White"
              src="/assets/icons/instagram_white_glyph_icon.svg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </div>
          <a
            className="text-white text-sm underline tracking-wider ml-1"
            href="https://www.instagram.com/momotrik.id/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className={styles.copyright}>
        <p className="text-white text-sm tracking-wider">
          &copy; 2021 Momotrik
        </p>
      </div>
    </footer>
  )
}

export default Footer
