import React, { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import useUploads from '../hooks/useUploads'
import UploadButton from './UploadButton'

type ImageUploaderProps = { name: string }

const ImageUploader = ({ name }: ImageUploaderProps) => {
  const {
    uploads,
    isUploading,
    uploadCount,
    addUploads,
  } = useUploads()

  const selectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      addUploads(name, selectedFiles)
    }
  }

  return (
    <div className="px-2">
      <UploadButton selectFiles={selectFiles} />

      <div className="columns-3 gap-2 md:gap-4">
      { uploads.map((upload, i) => (
        <div key={i} className="overflow-hidden relative rounded-lg mb-2 md:mb-4">
          { upload.status !== 'done' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <CgSpinner className="text-4xl animate-spin opacity-75" />
            </div>
          ) }
          <img src={`${upload.preview}`} className={`w-full ${(upload.status !== 'done') ? 'opacity-50 blur w-full' : 'opacity-100'}`} />
        </div>
      ))}
      </div>

      <div className="text-gray-400 text-sm text-center my-8">
        { (!isUploading && uploadCount === 0) && 'Je hebt nog geen foto\'s gedeeld'}
        { (!isUploading && uploadCount === 1) && 'Je hebt 1 foto gedeeld'}
        { (!isUploading && uploadCount > 1) && `Je hebt ${uploadCount} foto\'s gedeeld`}
        { isUploading && (
          <>
            <CgSpinner className="animate-spin inline align-text-top mr-2" />
            <span className="leading-none relative -top-[2px]">Foto&apos;s uploaden...</span>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
