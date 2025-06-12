import { createContext, useContext, useEffect, useRef, useState } from 'react'
import gColors from 'nano-grid/dist/gcolors.js'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
    onSubmit: () => {},
  })

  const dialogRef = useRef(null)

  const openModal = ({ title, message, onSubmit }) => {
    setModal({ open: true, title, message, onSubmit })
  }

  const closeModal = () => {
    setModal(prev => ({ ...prev, open: false }))
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modal.open && dialogRef.current && !dialogRef.current.contains(e.target)) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modal.open])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal.open && (
        <dialog open ref={dialogRef}>
          <header>
            <h1>{modal.title}</h1>
          </header>
          <div className="body">
            <p>{modal.message}</p>
          </div>
          <footer>
            <nn-btn
              color={gColors['persian-plum'].hex}
              onClick={() => {
                modal.onSubmit()
                closeModal()
              }}
            >
              Yes
            </nn-btn>
            <nn-btn
              color={gColors['dark-spring-green'].hex}
              onClick={closeModal}
            >
              No
            </nn-btn>
          </footer>
        </dialog>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
