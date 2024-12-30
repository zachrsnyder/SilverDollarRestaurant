import React from 'react'

interface DailogWrapperProps {
    dialogRef: React.RefObject<HTMLDialogElement>

    children: React.ReactNode

    className: string

    onClose: () => void

    onFocusMiss?: () => void

}

const DialogWrapper = ({ dialogRef, children, className, onClose, onFocusMiss = () => {onClose()}}: DailogWrapperProps) => {


  return (
    <dialog
        ref={dialogRef}
        onClose={onClose}
        onClick={(e) => {
            const dialogDimensions = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < dialogDimensions.left ||
              e.clientX > dialogDimensions.right ||
              e.clientY < dialogDimensions.top ||
              e.clientY > dialogDimensions.bottom
            ) {
              onFocusMiss();
            }
          }}
          className={className}
    >
        {children}
    </dialog>
  )
}

export default DialogWrapper