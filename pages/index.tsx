import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { MdEast } from 'react-icons/md'
import Header from '../components/Header'
import ImageUploader from '../components/ImageUploader'

const Home: NextPage = () => {
  const [isEditing, setIsEditing] = useState(true)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')

  const submitName = () => {
    localStorage.setItem('name', name)
    setIsEditing(false)
  }

  useEffect(() => {
    const savedName = localStorage.getItem('name')
    if (savedName) {
      setName(savedName)
      setIsEditing(false)
    }
    setLoading(false)
  }, [])

  if (loading) return null

  return (
    <div className="mx-auto max-w-2xl">
      <Head>
        <title>Bruiloft Koen & Linda</title>
      </Head>
      <Header />
      {isEditing ? (
        <div className="flex flex-col items-start pt-8 px-2">
          <label>Wat is je naam?</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded border text-l mt-2 mb-6 w-full p-2"
          />
          <div className="text-right w-full">
            <button
              onClick={submitName}
              className="disabled:opacity-50 disabled:cursor-not-allowed inline-block bg-green enabled:hover:bg-green-dark text-white py-2 px-4 rounded cursor-pointer"
              disabled={!name}
            >
              Volgende <MdEast className="inline text-xl align-text-top ml-1" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-gray-400 text-sm text-center my-8">
            Welkom{' '}
            <button onClick={() => setIsEditing(true)} className="underline">
              {name}
            </button>
            , selecteer je foto&apos;s om ze te delen.
          </div>
          <ImageUploader name={name} />
        </>
      )}
    </div>
  )
}

export default Home
