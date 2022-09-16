import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'

type ModalProps = {
  closeModal: () => void
  showModal: boolean
  children: ReactNode
}

const Modal = ({ showModal, closeModal, children }: ModalProps) => {
  if (!showModal) return null
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full">
      <div className="relative p-4 max-w-2xl m-auto">
        <div className="p-8 drop-shadow bg-white border rounded">
          <div className="flex items-end justify-end">
          <MdClose className="text-2xl" onClick={closeModal} />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
