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
      <h1 className="text-2xl font-semibold text-center pt-8 md:text-5xl md:pt-28 md:mb-5">
        Tentang Momotrik
      </h1>
      <p className="text-lg p-5 md:text-xl text-center">
        Momotrik adalah media informasi yang membahas segala seluk beluk tentang
        mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal
        tentang gaya hidup kendaraan listrik terbaru
      </p>
    </Layout>
  )
}

export default AboutPage
