import { useReducer } from 'react'

type UploadStatus = 'pending' | 'uploading' | 'done'

type Upload = {
  file: File,
  status: UploadStatus,
  preview: string
}

type UploadState = Upload[]

type UploadAction = {
  type: 'ADD_UPLOADS',
  payload: File[]
} | {
  type: 'UPLOAD_START' | 'UPLOAD_FINISHED',
  payload: string
}

const uploadReducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case 'ADD_UPLOADS':
      const newUploads = action.payload.map(file => ({
        file,
        status: 'pending' as UploadStatus,
        preview: URL.createObjectURL(file)
      }))
      return [...state, ...newUploads]
    case 'UPLOAD_START':
      return state.map(upload => {
        if (upload.file.name === action.payload) {
          return {
            ...upload,
            status: 'uploading'
          }
        }
        return upload
    })
    case 'UPLOAD_FINISHED':
      return state.map(upload => {
        if (upload.file.name === action.payload) {
          return {
            ...upload,
            status: 'done'
          }
        }
        return upload
    })
  }
}

const useUploads = () => {
  const [state, dispatch] = useReducer(uploadReducer, [])

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
      data.append('folder', name)
      data.append('context', `author=${name}`)
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data
      })
      if (response.ok) {
        dispatch({
          type: 'UPLOAD_FINISHED',
          payload: file.name
        })
      }
    })
  }

  const isUploading = state.some(upload => upload.status !== 'done')
  const uploadCount = state.filter(upload => upload.status === 'done').length

  return {
    uploads: state,
    isUploading,
    uploadCount,
    addUploads,
  }
}

export default useUploads
