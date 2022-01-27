import type { NextPage } from 'next'

import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('components/Layout'))

const AboutPage: NextPage = () => {
  return (
    <Layout
      title="Momotrik | Tentang Momotrik"
      description="Momotrik adalah media informasi yang membahas segala seluk beluk tentang mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal tentang gaya hidup kendaraan listrik terbaru"
      screen="md"
    >
      <h1 className="pt-8 text-center text-2xl font-semibold md:mb-5 md:pt-28 md:text-5xl">
        Tentang Momotrik
      </h1>
      <p className="p-5 text-center text-lg md:text-xl">
        Momotrik adalah media informasi yang membahas segala seluk beluk tentang
        mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal
        tentang gaya hidup kendaraan listrik terbaru
      </p>
    </Layout>
  )
}

export default AboutPage
