import buildUrl from 'cloudinary-build-url'
import { useEffect, useReducer, useState } from 'react'

type UploadStatus = 'pending' | 'uploading' | 'done'

type Upload = {
  file?: File,
  status: UploadStatus,
  preview: string
}

type UploadState = Upload[]

type UploadAction = {
  type: 'SET_UPLOADS',
  payload: Upload[]
} | {
  type: 'ADD_UPLOADS',
  payload: File[]
} | {
  type: 'UPLOAD_START',
  payload: string
} | {
  type: 'UPLOAD_FINISHED',
  payload: {
    filename: string,
    publicId: string
  }
}

const buildThumbnailUrl = (publicId: string) => buildUrl(publicId, {
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  },
  transformations: {
    resize: {
      type: 'scale',
      width: 200
    }
  }
})

const uploadReducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case 'SET_UPLOADS':
      return action.payload
    case 'ADD_UPLOADS':
      const newUploads = action.payload.map(file => ({
        file,
        status: 'pending' as UploadStatus,
        preview: URL.createObjectURL(file)
      }))
      return [...state, ...newUploads]
    case 'UPLOAD_START':
      return state.map(upload => {
        if (upload.file?.name === action.payload) {
          return {
            ...upload,
            status: 'uploading'
          }
        }
        return upload
    })
    case 'UPLOAD_FINISHED':
      return state.map(upload => {
        if (upload.file?.name === action.payload.filename) {
          return {
            status: 'done',
            preview: action.payload.publicId
          }
        }
        return upload
    })
  }
}

const useUploads = () => {
  const [state, dispatch] = useReducer(uploadReducer, [])
  const [loaded, setLoaded] = useState(false)

  const addUploads = (name: string, files: File[]) => {
    dispatch({
      type: 'ADD_UPLOADS',
      payload: files
    })
    files.forEach(async (file) => {
      dispatch({
        type: 'UPLOAD_START',
        payload: file.name
      })
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET as string)
      // data.append('folder', name)
      data.append('context', `author=${name}`)
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data
      })
      const result = await response.json()
      const publicId = result.public_id
      if (response.ok) {
        dispatch({
          type: 'UPLOAD_FINISHED',
          payload: {
            filename: file.name,
            publicId
          }
        })
      }
    })
  }

  const completedUploads = state.filter(upload => upload.status === 'done')
  const completedUploadsEncoded = JSON.stringify(completedUploads)

  useEffect(() => {
    const uploadsEncoded = localStorage.getItem('uploads')
    if (uploadsEncoded) {
      const uploads = JSON.parse(uploadsEncoded)
      dispatch({ type: 'SET_UPLOADS', payload: uploads })
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('uploads', completedUploadsEncoded)
    }
  }, [loaded, completedUploadsEncoded])

  const isUploading = state.some(upload => upload.status !== 'done')
  const uploadCount = completedUploads.length

  return {
    uploads: state.map(upload => upload.status === 'done' ? {
      ...upload,
      preview: buildThumbnailUrl(upload.preview)
    } : upload),
    isUploading,
    uploadCount,
    addUploads,
  }
}

export default useUploads
