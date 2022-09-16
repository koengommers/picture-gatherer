import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { MdEast } from 'react-icons/md'
import { BsQuestionCircleFill } from 'react-icons/bs'
import Header from '../components/Header'
import Modal from '../components/Modal'
import ImageUploader from '../components/ImageUploader'
import QuestionAnswer from '../components/QuestionAnswer'

const Home: NextPage = () => {
  const [isEditing, setIsEditing] = useState(true)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
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
          <div className="text-gray-700 text-center my-8">
            Welkom{' '}
            <button onClick={() => setIsEditing(true)} className="underline">
              {name}
            </button>
            , selecteer je foto&apos;s om ze te delen.
          </div>
          <ImageUploader name={name} />
        </>
      )}
      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <QuestionAnswer
          question="Wie kunnen de foto's zien?"
          answer="De foto's zijn alleen zichtbaar op jouw apparaat en voor Koen en Linda."
        />
        <QuestionAnswer
          question="Hoeveel foto's kan ik uploaden?"
          answer="Je mag zoveel foto's als je wilt uploaden. Let wel op: het gaat ten koste van je eigen data."
        />
        <QuestionAnswer
          question="Help! Het werkt niet"
          answer="Probeer Koen Gommers te vinden, hij kan je misschien helpen."
        />
      </Modal>
      <div
        className="absolute bottom-2 right-2 text-zinc-600 text-2xl"
        onClick={() => setShowModal(true)}
      >
        <BsQuestionCircleFill />
      </div>
    </div>
  )
}

export default Home
