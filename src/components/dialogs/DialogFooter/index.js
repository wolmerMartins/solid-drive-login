import React, { forwardRef } from 'react'

import './style.css'

const DialogFooter = forwardRef(({ children = null }, ref) => {
  const setRef = el => {
    if (!ref) return

    ref.current.footer = el
  }

  return (
    <footer
      ref={setRef}
      className="DialogFooter"
    >
      {children}
    </footer>
  )
})

export default DialogFooter
