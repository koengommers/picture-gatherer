import type { NextPage } from 'next'
import Head from 'next/head'
import ImageUploader from '../components/ImageUploader'

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <Head>
        <title>Bruiloft Koen & Linda</title>
      </Head>
      <header className="text-center my-4 px-4">
        <h1 className="text-4xl mb-1 font-display">Bruiloft Koen &amp; Linda</h1>
        <p>Deel je foto&apos;s met het bruidspaar!</p>
      </header>
      <ImageUploader />
    </div>
  )
}

export default Home
