import React from 'react'
import { MdAdd } from 'react-icons/md'

type Props = {
  selectFiles: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ selectFiles }: Props) => {
  return (
    <div className="my-10 text-center">
      <label
        htmlFor="file"
        className="inline-block bg-green hover:bg-green-dark text-white py-2 px-4 rounded cursor-pointer"
      >
        <MdAdd className="inline text-xl align-text-top mr-1" />
        <span>Foto&apos;s toevoegen</span>
      </label>
      <input
        hidden
        id="file"
        type="file"
        onChange={selectFiles}
        accept="image/jpeg"
        multiple
      />
    </div>
  )
}

export default UploadButton
